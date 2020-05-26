import React, { useState, useEffect } from 'react';
import { getPeople } from '../helpers/api';
import { PersonRow } from './PersonRow';

const tableHeader = ['id', 'name', 'sex', 'born', ' - ', 'died', 'mother', 'father'];

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);

  useEffect(() => {
    getPeople().then(peopleFromServer => {
      const preparedPeople = peopleFromServer.map((person: Person, index: number) => ({
        id: index + 1,
        ...person,
        mother: peopleFromServer.find((mom: { name: string }) => mom.name === person.motherName) || '',
        father: peopleFromServer.find((dad: { name: string }) => dad.name === person.fatherName) || '',
      }));

      return setPeople(preparedPeople);
    });
  }, []);

  return (
    <>
      <h2>People Page perhaps</h2>
      <table className="table">
        <thead>
          <tr>
            {tableHeader.map(item => {
              return <th className="table__header" key={item}>{item.toUpperCase()}</th>;
            })}
          </tr>
        </thead>
        <tbody>
          {people.map(person => (
            <PersonRow key={person.slug} person={person} />
          ))}
        </tbody>
      </table>
    </>
  );
};
