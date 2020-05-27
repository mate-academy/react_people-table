import React, { useState, useEffect, ChangeEventHandler } from 'react';
import { getPeople } from '../helpers/api';
import { PersonRow } from './PersonRow';

const tableHeader = ['id', 'name', 'sex', 'born', ' - ', 'died', 'mother', 'father'];

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [query, setQuery] = useState('');

  const handleInputChange: ChangeEventHandler<HTMLInputElement> = ({ target }) => {
    setQuery(target.value);
  };

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
  const visiblePeople = people.filter(({ name, fatherName, motherName }) => {
    return (name + motherName + fatherName).toLowerCase().includes(query.toLowerCase());
  });

  return (
    <>
      <h2>People Page perhaps</h2>
      <div className="search-field">
        <input
          type="text"
          className="search-field__input"
          value={query}
          onChange={(event) => handleInputChange(event)}
        />
      </div>
      {visiblePeople.length === 0
        ? <div>No requested data, dude</div>
        : (
          <table className="table">
            <thead>
              <tr>
                {tableHeader.map(item => {
                  return <th className="table__header" key={item}>{item.toUpperCase()}</th>;
                })}
              </tr>
            </thead>
            <tbody>
              {visiblePeople.map(person => (
                <PersonRow key={person.slug} person={person} />
              ))}
            </tbody>
          </table>
        )}
    </>
  );
};
