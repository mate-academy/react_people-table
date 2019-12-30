import React, { useState } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import peopleFromServer from '../people';
import PeopleTable from './PeopleTable';
import debounce from '../helpers';

const addPeopleFields = peopleArr => (
  peopleArr.map(
    (person, index) => ({
      id: index + 1,
      ...person,
      mother: person.mother || '',
      father: person.father || '',
      age: person.died - person.born,
      century: Math.ceil(person.died / 100),
    })
  )
);

const originalPeople = addPeopleFields(peopleFromServer);

const PeopleTablePage = () => {
  const [highlightedValue, setHighlightedValue] = useState('');
  const [searchValue, setSearchValue] = useState('');
  const [activeColumn, setActiveColumn] = useState(null);
  const [direction, setDirection] = useState(null);

  const history = useHistory();
  const location = useLocation();
  const search = new URLSearchParams(location.search);

  const applyFilterWithDebounce = debounce(query => setSearchValue(query), 500);

  const historyPushWithDebounce = debounce(() => {
    history.push({ search: search.toString() });
  }, 500);

  const searchPeople = (event) => {
    const value = event.target.value.trim().toLowerCase();

    search.set('query', value);
    const query = search.get('query');

    setHighlightedValue(value);
    applyFilterWithDebounce(query);
    historyPushWithDebounce();
  };

  const sortTable = (clickedColumn) => {
    search.set('sortBy', clickedColumn);

    if (activeColumn !== clickedColumn) {
      setActiveColumn(clickedColumn);
      setDirection('asc');
      search.set('sortOrder', 'asc');
    } else {
      setDirection(direction === 'asc' ? 'desc' : 'asc');
      search.set('sortOrder', direction === 'asc' ? 'desc' : 'asc');
    }

    history.push({ search: search.toString() });
  };

  const searchedPeople = originalPeople.filter(
    ({ name, mother, father }) => (name + mother + father)
      .toLowerCase()
      .includes(searchValue)
  );

  let sortType = '';

  if (searchedPeople[0]) {
    sortType = typeof searchedPeople[0][activeColumn];
  }

  const by = {
    string: (a, b) => a[activeColumn].localeCompare(b[activeColumn]),
    number: (a, b) => a[activeColumn] - b[activeColumn],
  };
  const callback = by[sortType] || (() => 0);
  const sortedPeople = searchedPeople.sort(callback);

  if (direction === 'desc') {
    sortedPeople.reverse();
  }

  return (
    <>
      <h1 className="main-title">People table</h1>
      <p className="table-info">
        {`Number of people: ${sortedPeople.length}`}
      </p>

      <input
        type="search"
        className="table-search"
        placeholder="Search for people"
        onChange={searchPeople}
      />

      <PeopleTable
        people={sortedPeople}
        sortTable={sortTable}
        highlightedValue={highlightedValue}
      />
    </>
  );
};

export default PeopleTablePage;
