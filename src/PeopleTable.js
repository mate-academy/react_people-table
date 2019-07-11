import React from 'react';
import Person from './Person';

const PeopleTable = ({ people }) => (
  <table className="PeopleTable">
    <thead>
      <tr>
        <th>ID</th>
        <th>Name</th>
        <th>Sex</th>
        <th>Born</th>
        <th>Died</th>
        <th>Father</th>
        <th>Mother</th>
      </tr>
    </thead>
    <tbody>
      {people.map(person => (
        <Person person={person} key={person.id} />
      ))}
    </tbody>
  </table>
);

export default PeopleTable;
