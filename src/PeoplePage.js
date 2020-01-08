import React from 'react';
import PropTypes from 'prop-types';
import Filter from './Filter';
import PeopleTable from './PeopleTable';
import people from './people';

const PeoplePage = ({ history, location, match }) => {
  const search = new URLSearchParams(location.search);
  let query = search.get('query');
  const peopleData = people.map(item => ({
    ...item,
    age: item.died - item.born,
    century: Math.ceil(item.died / 100),
  }));

  let sortPeople = peopleData;

  if (query) {
    query = query.toLowerCase();
    sortPeople = peopleData.filter(({ name, mother, father }) => (
      (name + mother + father).toLowerCase().includes(query)
    ));
  }

  const handleSearch = (event) => {
    search.set('query', event.target.value);
    history.push({ search: search.toString() });
  };

  return (
    <div>
      <h1>People table</h1>
      <p>{`number of people - ${sortPeople.length}`}</p>
      <PeopleTable
        people={sortPeople}
        history={history}
        location={location}
        match={match}
        selectText={query}
      />
      <Filter
        handleSearch={handleSearch}
      />
    </div>
  );
};

PeoplePage.propTypes = {
  history: PropTypes.objectOf.isRequired,
  location: PropTypes.objectOf.isRequired,
  match: PropTypes.objectOf.isRequired,
};

export default PeoplePage;
