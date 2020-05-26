import React, { useState, useEffect } from 'react';
import { getPeople, Person } from '../helpers/api';

import PeopleTable from './PeopleTable';

const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);

  useEffect(() => {
    getPeople().then(setPeople);
  }, []);

  const prepearedPeople = people.map((person, index) => ({
    ...person,
    id: index + 1,
  }));

  return (
    <div>
      <h1>People table</h1>
      <PeopleTable prepearedPeople={prepearedPeople} />
    </div>
  );
};

export default PeoplePage;
