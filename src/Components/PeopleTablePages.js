import React, { useState, useEffect } from 'react';

import { useLocation, useHistory } from 'react-router-dom';
import peopleFromServer from '../people';
import PeopleTable from './PeopleTable';
import debounce from './debounce';

const peopleFields = peopleArr => (
  peopleArr.map(
    (person, index) => ({
      id: index + 1,
      ...person,
      mother: person.mother || ' ',
      father: person.father || ' ',
      age: person.died - person.born,
      century: Math.ceil(person.died / 100),
      children: peopleArr.filter(
        child => child.father === person.name || child.mother === person.name
      ).map(child => child.name).join(', '),
    })
  )
);

const startStateOfPeople = peopleFields(peopleFromServer);

const PeopleTablePages = () => {
  const historyUse = useHistory();
  const locationUse = useLocation();
  const search = new URLSearchParams(locationUse.search);
  const query = (search.get('query') || '').toLowerCase();

  const [highlighted, setHighlighted] = useState(query);

  useEffect(() => {
    setHighlighted(query);
  }, [query]);

  const pushWithDebounce = debounce(() => {
    historyUse.push({ search: search.toString() });
  }, 500);

  const searchPeople = (event) => {
    const value = event.target.value.trim().toLowerCase();

    search.set('query', value);

    if (!(search.get('query') || '').trim()) {
      search.delete('query');
    }

    setHighlighted(value);
    pushWithDebounce(value);
  };

  const sortTable = (clickedColumn) => {
    if (search.get('sortBy') !== clickedColumn) {
      search.set('sortBy', clickedColumn);
      search.set('sortOrder', 'asc');
    } else {
      search.set('sortOrder', direction === 'asc' ? 'desc' : 'asc');
    }

    historyUse.push({ search: search.toString() });
  };

  const searchedPeople = startStateOfPeople.filter(
    ({ name, mother, father, children }) => (name + mother + father + children)
      .toLowerCase()
      .includes(query)
  );

  let sortType = '';
  const activeColumn = search.get('sortBy');
  const direction = search.get('sortOrder');

  if (searchedPeople[0]) {
    sortType = typeof searchedPeople[0][activeColumn];
  }

  const set = {
    string: (a, b) => a[activeColumn].localeCompare(b[activeColumn]),
    number: (a, b) => a[activeColumn] - b[activeColumn],
  };
  const callback = set[sortType] || (() => 0);
  const sortedPeople = searchedPeople.sort(callback);

  if (direction === 'desc') {
    sortedPeople.reverse();
  }

  return (
    <>
      <h1>People tables</h1>
      <p>
        {`Peoples: ${sortedPeople.length}`}
      </p>

      <input
        type="search"
        placeholder="Search peoples"
        onChange={searchPeople}
        value={highlighted}
      />

      <PeopleTable
        people={sortedPeople}
        sortTable={sortTable}
        highlightedValue={highlighted}
      />
    </>
  );
};

export default PeopleTablePages;
