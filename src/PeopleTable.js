import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useLocation, useHistory } from 'react-router-dom';
import Person from './Person';
import Sort from './Sort';

const columnTitles
  = ['id',
    'name',
    'sex',
    'born',
    'died',
    'age',
    'century',
    'mother',
    'father',
    'children'];

const PeopleTable = ({ match, people }) => {
  const [sortColumn, setSortColumn] = useState('id');

  const history = useHistory();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const input = searchParams.get('query');
  const sortOrder = searchParams.get('sortOrder');
  const sortColumnUrl = searchParams.get('sortBy');

  const handleSelectRow = (id) => {
    history.push({
      pathname: `/people/${(people.find(person => person.id === id).name)
        .toLowerCase().replace(/\s/g, '-')}`,
      search: location.search,
    });
  };

  const debounce = (f, delay) => {
    let timer;

    return (...args) => {
      clearTimeout(timer);
      timer = setTimeout(() => f(...args), delay);
    };
  };

  const handleInputChange = (value) => {
    searchParams.set('query', value);
    if (value) {
      history.push({ search: searchParams.toString() });
    } else {
      searchParams.delete('query');
      history.push({ search: searchParams.toString() });
    }
  };

  const handleSort = (title) => {
    if (title !== sortColumn) {
      searchParams.set('sortBy', title);
      searchParams.set('sortOrder', 'asc');
    }

    if (title === sortColumn) {
      searchParams.set('sortBy', title);
      searchParams.set('sortOrder', 'desc');
    }

    if (title === sortColumn && sortOrder === 'desc') {
      searchParams.set('sortOrder', 'asc');
    }

    history.push({ search: searchParams.toString() });
    setSortColumn(title);
  };

  const filteredPeople = input
    ? people.filter(person => person.name.toLowerCase()
      .includes(input.toLowerCase())
      || (person.mother !== null
        && person.mother.toLowerCase().includes(input.toLowerCase()))
      || (person.father !== null
        && person.father.toLowerCase().includes(input.toLowerCase())))
    : people;

  const sortingArr = (arr, col) => arr
    .sort((a, b) => (typeof (a[col]) === 'string'
      ? a[col].localeCompare(b[col])
      : a[col] - b[col]));

  const sortPeople = sortingArr(filteredPeople, sortColumnUrl);

  const PeopleToShow = sortOrder === 'desc'
    ? sortPeople.reverse()
    : sortPeople;

  const deboncedHandleInputChange = debounce(handleInputChange, 500);

  return (
    <>
      <p
        className="count"
        to="/people"
      >
        count of people:
        {' '}
        {PeopleToShow.length}
      </p>
      <label>
        <input
          onChange={event => deboncedHandleInputChange(event.target.value)}
          type="search"
          className="input"
          placeholder="Search"
        />
      </label>
      <table className="table">
        <thead>
          <tr>
            {columnTitles.map(title => (
              <Sort
                handleSort={handleSort}
                title={title}
              />
            ))}
          </tr>
        </thead>
        <tbody>
          {PeopleToShow.map(person => (
            <Person
              person={person}
              handler={handleSelectRow}
              selected={person.name.toLowerCase().replace(/\s/g, '-')
                === match.params.name}
            />
          ))}
        </tbody>
      </table>
    </>
  );
};

PeopleTable.propTypes = {
  people: PropTypes.arrayOf(PropTypes.object).isRequired,
  match: PropTypes.string.isRequired,
};

export default PeopleTable;
