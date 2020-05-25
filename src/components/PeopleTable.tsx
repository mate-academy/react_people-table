import React, { useEffect, useState, useCallback } from 'react';
import { useHistory, useLocation } from 'react-router-dom';

import { getPeople } from '../helpers/api';
import PersonRow from './PersonRow';
import { debounce } from '../helpers/debounce';

type SortBy = keyof Person | null;

const PeopleTable = () => {
  const history = useHistory();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);

  const [sortBy, setSortBy] = useState<SortBy>(searchParams.get('sortBy') as keyof Person);
  const [sortOrder, setSortOrder] = useState(searchParams.get('sortOrder'));
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
        if (sortOrder === 'desc') {
          return valueA.localeCompare(valueB);
        }

        return valueB.localeCompare(valueA);
      }

      if (typeof valueA === 'number' && typeof valueB === 'number') {
        if (sortOrder === 'desc') {
          return valueA - valueB;
        }

        return valueB - valueA;
      }

      return 0;
    });
  }

  const updateQueryUrl = useCallback(debounce((value: string) => {
    history.push({ search: value });
  }, 500), []);

  const handleSearchInput = (e: React.FormEvent<HTMLInputElement>) => {
    const { value } = e.currentTarget;

    if (value === '') {
      searchParams.delete('query');
    } else {
      searchParams.set('query', value);
    }

    updateQueryUrl(searchParams.toString());
    setSearchQuery(value);
  };

  const handleSortBy = (sortByName: keyof Person) => {
    const sortOrderToggle = sortOrder === 'asc' ? 'desc' : 'asc';

    setSortBy(sortByName);
    setSortOrder(sortOrderToggle);
    searchParams.set('sortBy', sortByName);
    searchParams.set('sortOrder', sortOrderToggle);

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
                  {(sortBy === title && sortOrder) && (
                    <span className="icon">
                      <img
                        className="sort-arrow"
                        src={
                          sortOrder === 'asc'
                            ? '/images/sort-down.svg'
                            : '/images/sort-up.svg'
                        }
                        alt="arrow"
                      />
                    </span>
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
