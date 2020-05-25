import React, { useEffect, useMemo, useState } from 'react';
import { useLocation, useHistory, Redirect } from 'react-router-dom';
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

declare type Callback = (myArgument: string) => (a: Person, b: Person) => number;

const sortType: Callback = (field: string) => {
  switch (field) {
    case 'id':
    case 'age':
    case 'born':
    case 'died':
    case 'century':
      return (a, b) => a[field] - b[field];
    default:
      return (a, b) => a[field].localeCompare(b[field]);
  }
};

const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const tableHeaders = createTableHeaders(people);
  const history = useHistory();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const sortedBy: keyof HeadersConfig = searchParams
    .get('sortBy') as keyof HeadersConfig || 'id';

  useEffect(() => {
    getTabs().then(setPeople);
  }, []);

  useMemo(() => {
    setPeople([...people].sort(sortType(sortedBy)));
  }, [sortedBy]);

  // eslint-disable-next-line no-prototype-builtins
  if (!headersConfig.hasOwnProperty(sortedBy)) {
    return <Redirect to="/error" />; // does not work
  }

  const sortTable = (event: React.MouseEvent<any>) => {
    const field = event.currentTarget.dataset.sortName;
    const callback = sortType(field);

    if (sortedBy !== field) {
      setPeople([...people].sort(callback));
      searchParams.set('sortBy', field);
      history.push({ search: searchParams.toString() });
    } else {
      setPeople([...people].reverse());
    }
  };

  return (
    <div className="PeoplePage">
      <h1>People table</h1>

      <PeopleTable
        people={people}
        tableHeaders={tableHeaders}
        sortTable={sortTable}
      />
    </div>
  );
};

export default PeoplePage;
