import React, { useEffect, useState } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
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

declare type Callback = (myArgument: string) => (a: Person, b: Person) => number;

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

const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const tableHeaders = createTableHeaders(people);
  const history = useHistory();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const historyPush = (name: string, params: string) => {
    searchParams.set(name, params);
    history.push({ search: searchParams.toString() });
  };

  useEffect(() => {
    getTabs().then(setPeople);
    historyPush('sortBy', 'id');
  }, []);

  const sortedBy: keyof HeadersConfig | null = searchParams
    .get('sortBy') as keyof HeadersConfig;

  const sortType: Callback = (field: string) => {
    switch (typeof people[0][field]) {
      case 'string':
        return (a, b) => a[field].localeCompare(b[field]);
      default:
        return (a, b) => a[field] - b[field];
    }
  };

  const sortTable = (event: React.MouseEvent<any>) => {
    const field = event.currentTarget.dataset.sortName;
    const callback = sortType(field);

    if (sortedBy !== field) {
      setPeople([...people].sort(callback));
      historyPush('sortBy', field);
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
