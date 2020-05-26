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
  const searchParams = new URLSearchParams(location.search);
  const query: string = searchParams.get('query') || '';
  const sortedBy: keyof HeadersConfig | null = searchParams
    .get('sortBy') as keyof HeadersConfig || 'id';

  const tableHeaders = createTableHeaders(people);
  const visiblePeople = people
    .filter(person => (new RegExp(query, 'i')).test(person.name));

  useEffect(() => {
    getTabs().then(res => {
      setPeople(res.sort(sortType(sortedBy)));
    });
  }, []);

  useMemo(() => {
    setPeople(ppl => ppl.sort(sortType(sortedBy)));
  }, [sortedBy]);

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

  const handleSelect = useCallback((field, person) => {
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
  }, [people, historyPush]);

  if (!people.length) {
    return <p>Loading...</p>;
  }

  if (personName && !people.some(person => person.slug === personName)) {
    historyPush({}, '');
  }

  const sortTable = (field: string) => {
    const callback = sortType(field);

    if (sortedBy !== field) {
      setPeople([...people].sort(callback));
      historyPush({ sortBy: field }, personName);
    } else {
      setPeople([...people].reverse());
    }
  };

  return (
    <div className="PeoplePage">
      <Header size="huge" content="People table" color="teal" />

      <PeopleTable
        people={visiblePeople}
        tableHeaders={tableHeaders}
        sortTable={sortTable}
        onSelect={handleSelect}
        path={personName}
      />
    </div>
  );
};

export default PeoplePage;
