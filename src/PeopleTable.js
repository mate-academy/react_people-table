import React from 'react';
import Person from './Person';

const PeopleTable = ({ people, sortBy }) => (
  <table>
    <thead>
      <tr>
        <th onClick={() => sortBy('id')}>id</th>
        <th onClick={() => sortBy('name')}>name</th>
        <th>sex</th>
        <th onClick={() => sortBy('born')}>born</th>
        <th onClick={() => sortBy('died')}>died</th>
        <th>mother</th>
        <th>father</th>
        <th onClick={() => sortBy('age')}>age</th>
        <th>century</th>
        <th>children</th>
      </tr>
    </thead>

    <tbody>
      {people.map(person => <Person item={person} />)}
    </tbody>
  </table>
);

export default PeopleTable;
