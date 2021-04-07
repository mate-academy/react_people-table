import React from 'react';

export const PeopleTable = ({ people }) => (
  <div>
    <table>
      <thead>
        <tr>
          <th>name</th>
          <th>sex</th>
          <th>born</th>
          <th>died</th>
          <th>father</th>
          <th>mother</th>
        </tr>
      </thead>
      <tbody>
        {people.map(person => (
          <tr key={person.name}>
            <td>{person.name}</td>
            <td>{person.sex}</td>
            <td>{person.born}</td>
            <td>{person.died}</td>
            <td>{person.father}</td>
            <td>{person.mother}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

