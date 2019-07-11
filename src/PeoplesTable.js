import React from 'react';

import Person from './Person';
import './PeopleTable.css'

const PeoplesTable = ({ peopleData }) => {
return (
  <table className="PeopleTable">
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
        <th>children</th>
      </tr>
    </thead>
    <tbody>
      {peopleData.map((person, i) => (
      <Person
        p={person}
        i={i}
        key={i}
       />
      ))}
    </tbody>
  </table>
)
}
export default PeoplesTable;
