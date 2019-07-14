import React from 'react';
import Person from './Person';

function PeopleTable({ people }) {
  return (
    <table className="people-table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Sex</th>
          <th>Born</th>
          <th>Died</th>
          <th>Age</th>
          <th>Century</th>
          <th>Mother</th>
          <th>Father</th>
          <th>Children</th>
        </tr>
      </thead>

      <tbody>
        {people.map( (person, index) => (
          <Person
            key={person.name}
            personData={person}
            id={index}
            people={people}
          />
        ))}
      </tbody>
    </table>
  );
}

export default PeopleTable;
