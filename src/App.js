import React, { useState, useEffect } from 'react';
import { DebounceInput as Input } from 'react-debounce-input';
import './App.css';
import { getDataFromServer } from './peopleApi';
import PeopleTable from './PeopleTable';

const URL = 'https://mate-academy.github.io/react_people-table/api/people.json';

const App = () => {
  const [people, setPeople] = useState([]);
  const [filtredPeople, setFiltredPeople] = useState([]);
  const [sortedField, setSortedField] = useState('id');

  useEffect(() => {
    const loadData = async() => {
      const peopleFromServer = await getDataFromServer(URL);
      const peopleWithId = peopleFromServer
        .map((person, i) => ({
          ...person,
          id: i + 1,
          mother: person.mother || '',
          father: person.father || '',
          age: person.died - person.born,
          century: Math.ceil(person.died / 100),
        }));

      setPeople(peopleWithId);
      setFiltredPeople(peopleWithId);
    };

    loadData();
  }, []);

  const filterPeople = (event) => {
    const value = event.target.value.trim().toLowerCase();

    setFiltredPeople(
      [...people].filter(({ name, mother, father }) => (
        (name + mother + father).toLowerCase().includes(value)
      )),
    );
  };

  const sortByField = (event) => {
    const field = event.target.textContent;
    const type = typeof people[0][field];

    if (field === sortedField) {
      setFiltredPeople([...filtredPeople].reverse());

      return;
    }

    switch (type) {
      case 'string':
        setFiltredPeople([...filtredPeople].sort((a, b) => (
          a[field].localeCompare(b[field])
        )));
        break;
      default:
        setFiltredPeople([...filtredPeople].sort((a, b) => (
          a[field] - b[field]
        )));
    }

    setSortedField(field);
  };

  return (
    <div className="App">
      <h1>People table</h1>
      <Input
        className="search-input"
        type="search"
        debounceTimeout={500}
        placeholder="Search..."
        onChange={filterPeople}
      />
      {filtredPeople.length === 0
        ? <h1>No results</h1>
        : <PeopleTable people={filtredPeople} sort={sortByField} />
      }
    </div>
  );
};

export default App;
