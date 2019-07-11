import React from 'react';
import Person from './Person';

const PeopleTable = ({ peoples }) => (
  <table>
    <thead>
      <tr>
        <th>id</th>
        <th>name</th>
        <th>sex</th>
        <th>born</th>
        <th>died</th>
        <th>mother</th>
        <th>father</th>
        <th>age</th>
        <th>century</th>
      </tr>
    </thead>

    <tbody>
      {peoples.map((person, i) => (
        <Person item={person} index ={i+1} />
      ))}
    </tbody>
  </table>
);

export default PeopleTable;
