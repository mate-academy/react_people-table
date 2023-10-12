import React, { useState } from 'react';
import { Button } from './components/Button';
import { PeopleTable } from './components/PeopleTable';

import '@fortawesome/fontawesome-free/css/all.css';
import 'bulma/css/bulma.css';
import './App.scss';

import peopleFromServer from './people.json';
import cn from 'classnames';
import { PeopleHeader } from './components/PeopleHeader';
import { PeopleFilters } from './components/PeopleFilters';

export const FILTERBYSEX = {
  ALL: 'all',
  M: 'm',
  F: 'f',
};

export const SORTBY = {
  NAME: 'name',
  SEX: 'sex',
  BORN: 'born',
};

function getFilteredPeople(people, sex, query) {
  let filteredPeople = [...people];

  if (query) {
    const normalizedQuery = query.toLowerCase();

    filteredPeople = filteredPeople.filter(person => (
      person.name.toLowerCase().startsWith(normalizedQuery)
    ))
  }

  if (sex !== 'all') {
    filteredPeople = filteredPeople.filter(person => person.sex === sex);
  }

  return filteredPeople;
}

function sortPeople(people, sortBy) {
  let sortedPeople = [...people];

  if (!Object.keys(sortBy).length) {
    return sortedPeople;
  }

  const [property] = Object.entries(sortBy);

  const [key, value] = property;

  switch (key) {
    case SORTBY.BORN:
      sortedPeople.sort((a, b) => {
        return value === 'ASC'
          ? a.born - b.born
          : b.born - a.born
      });
      break;

    case SORTBY.NAME:
    case SORTBY.SEX:
      sortedPeople.sort((a, b) => {
        return value === 'ASC'
          ? a[key].localeCompare(b[key])
          : b[key].localeCompare(a[key])
      })
    break;

    default:
     return sortedPeople;
  }

  return sortedPeople;
}

export const App = () =>  {
  const [selectedPeople, setSelectedPeople] = useState([]);
  const [filterBy, setFilterBy] = useState(FILTERBYSEX.ALL);
  const [query, setQuery] = useState('');
  const [sortBy, setSortBy] = useState({});

  const peopleForRendering = getFilteredPeople(peopleFromServer, filterBy, query);
  const visiblePeople = sortPeople(peopleForRendering, sortBy);

  const selectedPeopleNames = selectedPeople.map(person => person.name).join(', ');

  return (
    <div className="box">
      <PeopleHeader
        selectedPeopleNames={selectedPeopleNames}
      />

      <PeopleFilters
        filterBy={filterBy}
        setFilterBy={setFilterBy}
        setQuery={setQuery}
      />

      <PeopleTable
        sortBy={sortBy}
        setSortBy={setSortBy}
        peopleToRender={visiblePeople}
        selectedPeople={selectedPeople}
        setSelectedPeople={setSelectedPeople}
      />
    </div>
  );
}
