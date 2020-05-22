import React, { useEffect, useState } from 'react';
import PeopleTable from '../PeopleTable';
import { getTabs } from '../../api/getTabs';
import './PeoplePage.scss';

const createTableHeaders = (people: Person[]): TableHeader[] => {
  if (people.length === 0) {
    return [{ name: 'There are no people', code: '' }];
  }

  return (
    Object.keys(people[0]).map(key => ({
      code: key, name: key[0].toUpperCase() + key.slice(1),
    }))
  );
};


const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);

  useEffect(() => {
    getTabs().then(setPeople);
  }, []);
  const tableHeaders = createTableHeaders(people);
  // console.log(people);
  // console.log(createTableHeaders(people));

  return (
    <div className="PeoplePage">
      <h1>People table</h1>

      <PeopleTable
        people={people}
        tableHeaders={tableHeaders}
      />
    </div>
  );
};

export default PeoplePage;
