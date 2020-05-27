import React, { useCallback, useState, useEffect, useMemo } from 'react';
import { useLocation, useHistory, useParams } from 'react-router-dom';
import { Header } from 'semantic-ui-react';
import PeopleTable from '../PeopleTable';
import { getTabs } from '../../api/getTabs';
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

type Param = {
  [key: string]: string;
};

const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const history = useHistory();
  const location = useLocation();
  const { personName } = useParams();

  useEffect(() => {
    getTabs().then(setPeople);
  }, []);

  const searchParams = new URLSearchParams(location.search);
  const query: string = searchParams.get('query') || '';
  const page: number = Number(searchParams.get('page')) || 1;
  const perPage: number = Number(searchParams.get('perPage')) || 10;
  const isSortedAsc = searchParams.get('sortOrder') !== 'desc';
  const sortedBy: keyof HeadersConfig = searchParams
    .get('sortBy') as keyof HeadersConfig || 'id';

  const tableHeaders = createTableHeaders(people);
  const historyPush = useCallback((param: Param, path: string): void => {
    const params = {
      ...Object.fromEntries((searchParams.entries())),
      ...param,
    };
    const pathName = path || '';

    for (const key in params) {
      searchParams.set(key, params[key]);
    }

    history.push({
      pathname: `/people/${pathName}`,
      search: searchParams.toString(),
    });
  }, [history, searchParams]);

  const filteredPeople = useMemo(() => {
    const callback = sortType(sortedBy);
    const result = people
      .filter(({ name }) => name.toLowerCase().includes(query))
      .sort(callback);

    if (!isSortedAsc) {
      result.reverse();
    }

    return result;
  }, [people, query, sortedBy, isSortedAsc]);

  const totalPages = useMemo(() => (
    (Math.ceil(filteredPeople.length / perPage))
  ), [perPage, filteredPeople.length]);

  const currentPages = useMemo(() => {
    if (page > totalPages) {
      historyPush({ page: String(totalPages) }, personName);

      return totalPages;
    }

    return page;
  }, [page, totalPages, query]);

  const start = (page - 1) * perPage;
  const visiblePeople = useMemo(() => (
    filteredPeople.slice(start, start + perPage)
  ), [filteredPeople, start, perPage]);

  if (!people.length) {
    return <p>Loading...</p>;
  }

  if (personName && !people.some(person => person.slug === personName)) {
    historyPush({}, '');
  }

  const handleSelectPage = (_: React.SyntheticEvent, { activePage }: any) => {
    historyPush({ page: String(activePage) }, personName);
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
        page={currentPages}
        path={personName}
        onSortTable={handleSortTable}
        onSelectPerson={handleSelectPerson}
        onSelectPage={handleSelectPage}
      />
    </div>
  );
};

export default PeoplePage;
