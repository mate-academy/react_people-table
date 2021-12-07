import React, { useState, useEffect } from 'react';
import { getPeople } from '../../api/api';

export const PeoplePage = () => {
  const [people, setPeople] = useState(null);

  useEffect(() => {
    getPeople()
      .then(result => setPeople(result
        .map(person => (
          {
            ...person,
            mother: result.find(item => item.name === person.motherName),
            father: result.find(item => item.name === person.fatherName),
          }
        ))));
  }, []);

console.log(people);

  return (
    <h2>People Page</h2>
  );
};
