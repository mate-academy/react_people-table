import React, { useState, useEffect } from 'react';
import { DebounceInput as Input } from 'react-debounce-input';
import { useHistory, useLocation } from 'react-router';
import { getDataFromServer, URL } from './peopleApi';
import PeopleTable from './PeopleTable';

const TablePage = () => {
  const [people, setPeople] = useState([]);
  const history = useHistory();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const sortedBy = searchParams.get('sortBy');
  const sortOrder = searchParams.get('sortOrder');

  let filteredPeople = [...people].filter(({ name, mother, father }) => (
    (name + mother + father)
      .toLowerCase().includes(searchParams.get('query') || '')
  ));

  filteredPeople = sortPeople([...filteredPeople], sortedBy, sortOrder);

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
    };

    searchParams.set('sortBy', 'id');
    searchParams.set('sortOrder', 'asc');
    history.push({ search: searchParams.toString() });

    loadData();
  }, []);

  function sortPeople(arr, field, order) {
    const sortedArr = [...arr].sort((a, b) => (
      typeof a[field] === 'string'
        ? a[field].localeCompare(b[field])
        : a[field] - b[field]
    ));

    return sortOrder === 'desc' ? sortedArr.reverse() : sortedArr;
  }

  const filterPeople = (event) => {
    const value = event.target.value.trim().toLowerCase();

    searchParams.set('query', value);
    history.push({ search: searchParams.toString() });
  };

  const handleSortClick = (event) => {
    const field = event.target.textContent;

    if (sortedBy !== field) {
      searchParams.set('sortBy', field);
      searchParams.set('sortOrder', 'asc');
    } else {
      searchParams.set('sortOrder',
        sortOrder === 'asc' ? 'desc' : 'asc');
    }

    history.push({ search: searchParams.toString() });
  };

  return (
    <>
      <h1>People table</h1>
      <Input
        className="search-input"
        type="search"
        debounceTimeout={500}
        placeholder="Search..."
        onChange={filterPeople}
      />
      {filteredPeople.length === 0
        ? <h1>No results</h1>
        : <PeopleTable people={filteredPeople} sort={handleSortClick} />
      }
    </>
  );
};

export default TablePage;
