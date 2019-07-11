import React from 'react';
import Person from './Person';

const PeopleTable = ({ peoples }) => (
  <table>
    <thead>
      <tr>
        <th>name</th>
        <th>sex</th>
        <th>born</th>
        <th>died</th>
        <th>mother</th>
        <th>father</th>
      </tr>
    </thead>

    <tbody>
      {peoples.map(person => (
        <Person item={person} />
      ))}
    </tbody>
  </table>
);

export default PeopleTable;
