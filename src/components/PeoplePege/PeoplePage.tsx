import React, { useMemo } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { Header } from 'semantic-ui-react';
import PeopleTable from '../PeopleTable';
import './PeoplePage.scss';

const headersConfig: HeadersConfig = {
  id: 'Id',
  name: 'Name',
  sex: 'Sex',
  age: 'Age',
  born: 'Born',
  died: 'Died',
  century: 'Century',
  father: 'Father',
  mother: 'Mother',
  children: 'Children',
};

const createTableHeaders = (people: Person[]): TableHeader[] => {
  if (people.length === 0) {
    return [{ name: 'There are no people', code: '' }];
  }

  return (
    Object.entries(headersConfig).map(([key, value]) => ({
      code: key, name: value,
    }))
  );
};

declare type Callback = (arg: string) => (a: Person, b: Person) => number;

const sortType: Callback = (field) => {
  switch (field) {
    case 'id':
    case 'age':
    case 'born':
    case 'died':
    case 'century':
      return (a, b) => a[field] - b[field];
    case 'name':
    case 'sex':
    case 'father':
    case 'mother':
    case 'children':
      return (a, b) => a[field].localeCompare(b[field]);
    default:
      return () => 0;
  }
};

type Props = {
  people: Person[];
  historyPush: (param: Param, path: string) => void;
};

const PeoplePage: React.FC<Props> = React.memo(
  ({ people, historyPush }) => {
    const location = useLocation();
    const { personName } = useParams();

    const searchParams = new URLSearchParams(location.search);
    const page: number = Number(searchParams.get('page')) || 1;
    const perPage: number = Number(searchParams.get('perPage')) || 5;
    const isSortedAsc = searchParams.get('sortOrder') !== 'desc';
    const sortedBy: keyof HeadersConfig = searchParams
      .get('sortBy') as keyof HeadersConfig || 'id';

    const tableHeaders = createTableHeaders(people);

    const sortedPeople = useMemo(() => {
      const callback = sortType(sortedBy);
      const result = [...people].sort(callback);

      if (!isSortedAsc) {
        result.reverse();
      }

      return result;
    }, [people, sortedBy, isSortedAsc]);

    const totalPages = useMemo(() => {
      const reckon = Math.ceil(sortedPeople.length / perPage);

      if (people.length && page > reckon) {
        historyPush({ page: String(reckon), perPage: '5' }, personName);
      }

      return reckon;
    }, [page, perPage, sortedPeople, personName, people, historyPush]);

    const start = (page - 1) * perPage;
    const visiblePeople = useMemo(() => (
      sortedPeople.slice(start, start + perPage)
    ), [sortedPeople, start, perPage]);

    if (personName && !people.some(person => person.slug === personName)) {
      historyPush({}, '');
    }

    const handleSelectPage = (_: React.SyntheticEvent, { activePage }: any) => {
      historyPush({ page: String(activePage) }, personName);
    };

    const handleSelectPerPage = (_: React.SyntheticEvent, { name, value }: any) => {
      const param = { [name]: String(value) };

      historyPush(param, personName);
    };

    const handleSelectPerson = (field: string, person: Person) => {
      const path: string | undefined = people
        .find(parent => parent.name === person[field])?.slug;

      if (field === 'name') {
        historyPush({}, person.slug);
      }

      if (path) {
        if (field === 'mother') {
          historyPush({}, path);
        } else if (field === 'father') {
          historyPush({}, path);
        }
      }
    };

    const handleSortTable = (field: string) => {
      if (sortedBy !== field) {
        historyPush({
          sortBy: field,
          sortOrder: 'asc',
        }, personName);
      } else {
        historyPush({
          sortOrder: isSortedAsc ? 'desc' : 'asc',
        }, personName);
      }
    };

    return (
      <div className="PeoplePage">
        <Header size="huge" content="People table" color="teal" />

        <PeopleTable
          tableHeaders={tableHeaders}
          people={visiblePeople}
          totalPages={totalPages}
          page={page}
          perPage={perPage}
          path={personName}
          onSortTable={handleSortTable}
          onSelectPerson={handleSelectPerson}
          onSelectPage={handleSelectPage}
          onSelectPerPage={handleSelectPerPage}
        />
      </div>
    );
  },
);


export default PeoplePage;
