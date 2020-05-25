import React, { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';

import { getPeople } from '../helpers/api';
import PersonRow from './PersonRow';

type SortBy = keyof Person | null;

const PeopleTable = () => {
  const history = useHistory();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);

  const [sortBy, setSortBy] = useState<SortBy>(searchParams.get('sortBy') as keyof Person);
  const [searchQuery, setSearchQuery] = useState(searchParams.get('query') || '');
  const [people, setPeople] = useState<Person[]>([]);
  const headTitle = ['name', 'sex', 'born', 'died', 'motherName', 'fatherName'];

  useEffect(() => {
    getPeople().then(peopleFromServer => {
      setPeople(peopleFromServer
        .map(person => {
          return {
            ...person,
            mother: peopleFromServer.find(({ name }) => name === person.motherName),
            father: peopleFromServer.find(({ name }) => name === person.fatherName),
          };
        }));
    });
  }, []);

  let preparedPeopleList: Person[] = people.filter(person => {
    if (searchQuery) {
      const regExp = new RegExp(searchQuery, 'i');

      return person.name.match(regExp)
        || (person.motherName && person.motherName.match(regExp))
        || (person.fatherName && person.fatherName.match(regExp));
    }

    return person;
  });

  if (sortBy) {
    preparedPeopleList = [...preparedPeopleList].sort((a, b) => {
      const valueA = a[sortBy];
      const valueB = b[sortBy];

      if (typeof valueA === 'string' && typeof valueB === 'string') {
        return valueB.localeCompare(valueA);
      }

      if (typeof valueA === 'number' && typeof valueB === 'number') {
        return valueB - valueA;
      }

      return 0;
    });
  }

  const handleSearchInput = (e: React.FormEvent<HTMLInputElement>) => {
    const { value } = e.currentTarget;

    setSearchQuery(value);
    searchParams.set('query', value);
    history.push({
      search: searchParams.toString(),
    });
  };

  const handleSortBy = (sortByName: keyof Person) => {
    setSortBy(sortByName);
    searchParams.set('sortBy', sortByName);
    history.push({
      search: searchParams.toString(),
    });
  };

  return (
    <>
      <input
        className="input"
        type="text"
        placeholder="Find a person"
        value={searchQuery}
        onChange={handleSearchInput}
      />
      <table className="table is-striped is-fullwidth">
        <thead>
          <tr>
            {headTitle.map((title: string) => (
              <th key={title}>
                <button
                  className="button is-small"
                  type="button"
                  onClick={() => handleSortBy(title as keyof Person)}
                >
                  {sortBy === title && (
                    <>*</>
                  )}
                  {title}
                </button>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {preparedPeopleList.map(person => (
            <PersonRow
              key={person.name}
              person={person}
            />
          ))}
        </tbody>
      </table>
    </>
  );
};

export default PeopleTable;
