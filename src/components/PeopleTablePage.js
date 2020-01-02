import React, { useState, useEffect } from 'react';
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
      children: peopleArr.filter(
        child => child.father === person.name || child.mother === person.name
      ).map(child => child.name).join(', '),
    })
  )
);

const originalPeople = addPeopleFields(peopleFromServer);

const PeopleTablePage = () => {
  const history = useHistory();
  const location = useLocation();
  const search = new URLSearchParams(location.search);
  const query = (search.get('query') || '').toLowerCase();

  const [highlightedValue, setHighlightedValue] = useState(query);

  useEffect(() => {
    setHighlightedValue(query);
  }, [query]);

  const historyPushWithDebounce = debounce(() => {
    history.push({ search: search.toString() });
  }, 500);

  const searchPeople = (event) => {
    const value = event.target.value.trim().toLowerCase();

    search.set('query', value);

    if (!(search.get('query') || '').trim()) {
      search.delete('query');
    }

    setHighlightedValue(value);
    historyPushWithDebounce(value);
  };

  const sortTable = (clickedColumn) => {
    if (search.get('sortBy') !== clickedColumn) {
      search.set('sortBy', clickedColumn);
      search.set('sortOrder', 'asc');
    } else {
      search.set('sortOrder', direction === 'asc' ? 'desc' : 'asc');
    }

    history.push({ search: search.toString() });
  };

  const searchedPeople = originalPeople.filter(
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
        value={highlightedValue}
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
