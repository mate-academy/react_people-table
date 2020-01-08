import React, { useState, useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { DebounceInput } from 'react-debounce-input';
import PeopleTable from './PeopleTable';

// eslint-disable-next-line
const API_URL = 'https://mate-academy.github.io/react_people-table/api/people.json';
const getPeopleFromServer = () => fetch(API_URL)
  .then(response => response.json());

const PeopleList = () => {
  const [people, setPeople] = useState([]);
  const [selectedPerson, setSelectedPerson] = useState(0);
  const history = useHistory();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const sortBy = searchParams.get('sortBy');
  const sortOrder = searchParams.get('sortOrder');

  let filteredPeople = [...people]
    .filter(person => (person.name + person.mother + person.father)
      .toLowerCase()
      .includes(searchParams.get('query') || ''));

  const selectHandler = id => setSelectedPerson(id);

  filteredPeople = sortPeople([...filteredPeople], sortBy, sortOrder);

  useEffect(() => {
    const loadPeople = async() => {
      const peopleFromServer = await getPeopleFromServer(API_URL);
      const preparedPeople = peopleFromServer.map((person, index) => ({
        ...person,
        id: index + 1,
        age: person.died - person.born,
        mother: person.mother || '',
        father: person.father || '',
        century: Math.ceil(person.died / 100),
      }));

      setPeople(preparedPeople);
    };

    loadPeople();
  }, []);

  function sortPeople(peopleArr, field) {
    const sortedPeople = [...peopleArr]
      .sort((a, b) => (typeof a[field] === 'string'
        ? a[field].localeCompare(b[field])
        : a[field] - b[field]));

    return sortOrder === 'desc' ? sortedPeople.reverse() : sortedPeople;
  }

  const filterPeople = (event) => {
    const value = event.target.value.trim().toLowerCase();

    searchParams.set('query', value);
    history.push({ search: searchParams.toString() });
  };

  const handleSortClick = (event) => {
    const field = event.target.textContent;

    if (sortBy !== field) {
      searchParams.set('sortBy', field);
      searchParams.set('sortOrder', 'asc');
    } else {
      searchParams.set('sortOrder', sortOrder === 'asc' ? 'desc' : 'asc');
    }

    history.push({ search: searchParams.toString() });
  };

  return (
    <>
      <h1>People Table</h1>
      <DebounceInput
        debounceTimeout={1000}
        type="search"
        placeholder="search"
        onChange={filterPeople}
        className="input"
      />
      {filteredPeople.length === 0
        ? <p>Person  is not found</p>
        : (
          <PeopleTable
            filteredPeople={filteredPeople}
            handleSortClick={handleSortClick}
            selectHandler={selectHandler}
            selectedPerson={selectedPerson}
          />
        )
      }
    </>
  );
};

export default PeopleList;
