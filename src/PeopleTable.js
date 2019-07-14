import React from 'react';
import Person from './Person';

const PeopleTable = ({ peoples, sorting }) => (
  <table>
    <thead>
      <tr>
        <th onClick={() =>sorting('id')}>id</th>
        <th onClick={() =>sorting('name')}>name</th>
        <th>sex</th>
        <th onClick={() =>sorting('born')}>born</th>
        <th onClick={() =>sorting('died')}>died</th>
        <th>mother</th>
        <th>father</th>
        <th onClick={() =>sorting('age')}>age</th>
        <th>century</th>
        <th>children</th>
      </tr>
    </thead>

    <tbody>
      {peoples.map((person, i) => (
        <Person item={person} index={i + 1} />
      ))}
    </tbody>
  </table>
);

export default PeopleTable;
