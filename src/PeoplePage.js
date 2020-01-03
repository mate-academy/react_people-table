import React, { useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import peopleFromServer from './people';
import PeopleFilter from './PeopleFilter';
import PeopleTable from './PeopleTable';
import { debounce } from './debounce';

const preparedPeople = peopleFromServer.map(
  (person, index) => (
    {
      ...person,
      id: index + 1,
      age: person.died - person.born,
      century: Math.ceil(person.died / 100),
    }
  )
);

const PeoplePage = () => {
  const [people] = useState([...preparedPeople]);

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);

  const history = useHistory();

  const setQuery = debounce((input) => {
    searchParams.set('query', input);
    history.push({ search: searchParams.toString() });
  }, 500);

  const setSortBy = (sortBy) => {
    searchParams.set('sortBy', sortBy);
    history.push({ search: searchParams.toString() });
  };

  const getSortedPeople = () => {
    const sortBy = searchParams.get('sortBy');

    switch (typeof people[0][sortBy]) {
      case 'string':
        return (people
          .sort((a, b) => a[sortBy].localeCompare(b[sortBy])));
      default:
        return (people
          .sort((a, b) => a[sortBy] - b[sortBy]));
    }
  };

  const filter = searchParams.get('query') || '';

  const visiblePeople = getSortedPeople()
    .filter(person => (person.name + person.mother + person.father)
      .toLowerCase().includes(filter));

  return (
    <div className="App">
      <h1>People table</h1>
      <PeopleFilter setQuery={setQuery} />
      <h4>
        {visiblePeople.length}
        {' '}
        people found
      </h4>
      <PeopleTable
        people={visiblePeople}
        setSortBy={setSortBy}
      />
    </div>
  );
};

export default PeoplePage;
