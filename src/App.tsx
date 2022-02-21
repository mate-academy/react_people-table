/* eslint-disable no-console */
import React, { useEffect, useState } from 'react';

import './App.scss';

interface Person {
  name: string;
  sex: string;
  born: number;
  died: number;
  fatherName: string;
  motherName: string;
  slug: string;
}

function getPeople(): Promise<Person[]> {
  const API_URL = 'https://mate-academy.github.io/react_people-table/api';

  return fetch(`${API_URL}/people.json`).then((response) => response.json());
}

function getVisiblePeople(
  people: Person[],
  query: string,
  sortBy: string,
): Person[] {
  const lowerQuery = query.toLowerCase();
  const visiblePeople = people.filter(
    (person) => person.name.toLowerCase().includes(lowerQuery),
  );

  switch (sortBy) {
    case 'name':
      visiblePeople.sort((a, b) => a.name.localeCompare(b.name));
      break;

    case 'born':
      visiblePeople.sort((a, b) => a.born - b.born);
      break;

    default:
  }

  return visiblePeople;
}

function App() {
  const [query, setQuery] = useState('');
  const [sortBy, setSortBy] = useState('name');
  const [people, setPeople] = useState<Person[]>([]);
  const [selectedPeople, setSelectedPeople] = useState<Person[]>([]);

  useEffect(() => {

    getPeople()
      .then((peopleFromServer) => {
        setPeople(peopleFromServer);
      });

  }, [query, sortBy]);

  const visiblePeople = getVisiblePeople(people, query, sortBy);

  return (
    <div className="App">
      <h1>People table</h1>

      <input
        type="text"
        value={query}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          setQuery(event.currentTarget.value);
        }}
      />

      <button
        type="button"
        onClick={() => {
          setSortBy('born');
        }}
      >
        Sort by born
      </button>

      <button
        type="button"
        onClick={() => {
          setSortBy('name');
        }}
      >
        Sort by name
      </button>

      <table>
        <thead>
          <tr>
            <th>.</th>
            <th>Sex</th>
            <th>Name</th>
            <th>Born</th>
          </tr>
        </thead>
        <tbody>
          {visiblePeople.map((person) => (
            <tr key={person.slug}>
              <td>
                {selectedPeople.some((selectedPerson) => selectedPerson.slug === person.slug) ? (
                  <button
                    type="button"
                    onClick={() => {
                      const filteredPeople = selectedPeople.filter(
                        (selectedPerson) => selectedPerson.slug !== person.slug,
                      );

                      setSelectedPeople(filteredPeople);
                    }}
                  >
                    Remove
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedPeople([...selectedPeople, person]);
                    }}
                  >
                    Add
                  </button>
                )}
              </td>
              <td>{person.sex}</td>
              <td>{person.name}</td>
              <td>{person.born}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
