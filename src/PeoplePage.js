import React, { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import PeopleTable from './PeopleTable';

const PEOPLE_FROM_SERVER_API
  = 'https://mate-academy.github.io/react_people-table/api/people.json';

const getPeopleFromServer = () => fetch(PEOPLE_FROM_SERVER_API)
  .then(response => response.json());

const PeoplePage = () => {
  const [people, setPeople] = useState([]);

  useEffect(() => {
    getPeopleFromServer().then((peopleFromServer) => {
      setPeople(
        peopleFromServer.map((person, index) => ({
          ...person,
          id: index + 1,
          age: person.died - person.born,
          century: Math.ceil(person.died / 100),
        }))
      );
    });
  }, []);

  const setSortingByParams = (params) => {
    switch (params) {
      case 'name':
      case 'sex':
        setPeople(people
          .sort((a, b) => a[params].localeCompare(b[params])));
        break;
      case 'born':
      case 'died':
      case 'age':
      case 'century':
        setPeople(people
          .sort((a, b) => a[params] - b[params]));
        break;
      default:
        setPeople(people);
    }

    searchParams.set('sortBy', searchParams);
    history.push({
      search: searchParams.toString(),
    });
  };

  const history = useHistory();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const query = searchParams.get('query') || '';

  const filteredPeople = () => ([...people]
    .filter(person => (person.name + person.mother + person.father)
      .toLowerCase().includes(query)));

  const shownPeople = query ? filteredPeople() : [...people];

  return (
    <>
      <input
        type="text"
        placeholder="Search..."
        className="input"
        value={query}
        // make a separate function
        onChange={(event) => {
          searchParams.set('query', event.target.value);
          history.push({
            search: searchParams.toString(),
          });
        }}
      />
      <PeopleTable
        setSortingByParams={setSortingByParams}
        people={shownPeople}
      />
    </>
  );
};

export default PeoplePage;
