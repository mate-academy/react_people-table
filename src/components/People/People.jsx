import React, { useState, useEffect } from 'react';
import { getPeople } from '../../api';

export const People = () => {
  const [people, setPeople] = useState(null);

  useEffect(() => {
    getPeople()
      .then(people => setPeople(people
        .map(person => {
          return {
            ...person,
            father: people.find(body => body.name === person.fatherName),
            mother: people.find(body => body.name === person.motherName),
          }
        })))
  }, []);

  console.log(people);

  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Sex</th>
          <th>Born</th>
          <th>Died</th>
          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>
      <tbody>
        {people && (
          people.map(person => (
            <tr key={person.slug}>
              <td>{person.name}</td>
              <td>{person.sex}</td>
              <td>{person.born}</td>
              <td>{person.died}</td>
              {/* <td>{person.father.name && person.father.name}</td> */}
              {/* <td>{person.mother.name && person.mother.name}</td> */}
            </tr>
          ))
        )}
        
      </tbody>
    </table>
  )
};
