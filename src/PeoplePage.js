import React, { useState, useEffect } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import TablePeople from './TablePeople';

const API = 'https://mate-academy.github.io/react_people-table/api/people.json';
const getPeople = () => fetch(API)
  .then(response => response.json());

const PeoplePage = () => {
  useEffect(() => {
    getPeople()
      .then((peopleFromServer) => {
        setPeople(peopleFromServer.map((person, index) => ({
          ...person,
          id: index + 1,
          age: person.died - person.born,
          century: Math.ceil(person.died / 100),
        })));
      });
  }, []);

  const [people, setPeople] = useState([]);

  const setSortBy = (selectParams) => {
    switch (selectParams) {
      case 'name':
      case 'sex':
        setPeople([...people]
          .sort((a, b) => a[selectParams].localeCompare(b[selectParams])));
        break;
      case 'died':
      case 'born':
      case 'id':
      case 'age':
      case 'century':
        setPeople([...people]
          .sort((a, b) => a[selectParams] - b[selectParams]));
        break;
      default: setPeople([...people]);
    }

    searchParams.set('sortBy', selectParams);
    history.push({ search: searchParams.toString() });
  };

  const location = useLocation();
  const history = useHistory();
  const searchParams = new URLSearchParams(location.search);

  const query = searchParams.get('query') || '';
  const handleInputQuery = (event) => {
    searchParams.set('query', event.target.value.toLowerCase());
    history.push({
      search: searchParams.toString(),
    });
  };

  const searchPeople = () => (
    people.filter(person => (person.name || '').toLowerCase().includes(query)
      || (person.mother || '').toLowerCase().includes(query)
      || (person.mother || '').toLowerCase().includes(query))
  );

  const visiblePeople = query ? searchPeople() : [...people];

  return (
    <div>
      <div className="ui left icon input">
        <input
          type="text"
          placeholder="Search..."
          value={query}
          onChange={handleInputQuery}
        />
        <i className="users icon" />
      </div>
      <TablePeople setSortBy={setSortBy} people={visiblePeople} />
    </div>
  );
};

export default PeoplePage;
