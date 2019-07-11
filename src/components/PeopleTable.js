import React from 'react';
import Person from './Person';

const PeopleTable = ({ people }) => (
  <>
    {people.map(person => (
      <Person person={person} key={person.id} />
    ))}
  </>
);

export default PeopleTable;
