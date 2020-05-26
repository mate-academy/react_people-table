import React, { useState, useEffect, useMemo } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { getPeople } from '../helpers/api';
// import { } from '../helpers/debounce';
import { PeopleTable } from './PeopleTable';

export const PeoplePage: React.FC = () => {
  const [tableWithPeople, setTableWithPeople] = useState<PreparedPerson[]>([]);

  const history = useHistory();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const search = searchParams.get('query') || '';
  const sortType = searchParams.get('sortBy') || '';
  const sortOrder = searchParams.get('sortOrder') || '';

  const sortPeople = (sortParam: string) => {
    switch (sortParam) {
      case 'Name':
        return (a: PreparedPerson, b: PreparedPerson) => {
          return a.name.localeCompare(b.name);
        };

      case 'Sex':
        return (a: PreparedPerson, b: PreparedPerson) => a.sex.localeCompare(b.sex);
      case 'Born':
        return (a: PreparedPerson, b: PreparedPerson) => a.born - b.born;
      default:
        return (a: PreparedPerson, b: PreparedPerson) => a.died - b.died;
    }
  };

  useEffect(() => {
    const getDataFromServer = async () => {
      const { data } = await getPeople();

      setTableWithPeople(
        data.map((person: Person) => ({
          ...person,
          fatherName: data.find(
            (father: Person) => person.fatherName === father.name,
          ),
          motherName: data.find(
            (mother: Person) => person.motherName === mother.name,
          ),
        })),
      );
    };

    getDataFromServer();
  }, []);

  const getFilteredPersons = (
    searchQuery: string,
    people: PreparedPerson[],
  ) => {
    if (!searchQuery) {
      return people;
    }

    const normalizedQuery = searchQuery.toLowerCase();

    return people.filter((person) => {
      if (!person.fatherName || !person.motherName) {
        return person.name.toLowerCase().includes(normalizedQuery);
      }

      return `${person.name}
              + ${person.fatherName.name}
              +${person.motherName.name}`
        .toLowerCase()
        .includes(normalizedQuery);
    });
  };

  const filteredTable = useMemo(() => {
    if (sortOrder === 'asc' || sortOrder === '') {
      return getFilteredPersons(search, tableWithPeople).sort(sortPeople(sortType));
    }

    return getFilteredPersons(search, tableWithPeople).sort(sortPeople(sortType)).reverse();
  }, [search, tableWithPeople, sortType, sortOrder]);

  return (
    <>
      <input
        type="text"
        value={search}
        onChange={(e) => {
          searchParams.set('query', e.target.value);
          history.push({
            search: searchParams.toString(),
          });
        }}
      />
      <PeopleTable people={filteredTable} />
    </>
  );
};
