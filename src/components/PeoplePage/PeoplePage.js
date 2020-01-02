import React from 'react';
import PropTypes from 'prop-types';
import debounce from 'lodash/debounce';
import PeopleTable from '../PeopleTable';

import peopleFromServer from '../../api/people';

let counter = 0;
const preparedPeople = peopleFromServer.map((person) => {
  counter += 1;

  return {
    id: counter,
    ...person,
    father: person.father || '',
    mother: person.mother || '',
    age: person.died - person.born,
    century: Math.ceil(person.died / 100),
    children: person.sex === 'm'
      ? peopleFromServer.filter(child => child.father === person.name)
        .map(child => child.name)
      : peopleFromServer.filter(child => child.mother === person.name)
        .map(child => child.name),
  };
});

const PeoplePage = ({ history, location, match }) => {
  let people = preparedPeople;

  const search = new URLSearchParams(location.search);
  let query = search.get('query');

  if (query) {
    query = query.toLowerCase();
    people = preparedPeople.filter(person => person.name.toLowerCase()
      .includes(query)
      || person.father.toLowerCase().includes(query)
      || person.mother.toLowerCase().includes(query));
  }

  const historyPushWithDebounce = debounce(() => {
    history.push({ search: search.toString() });
  }, 500);

  const searchPeople = (event) => {
    const value = event.target.value.trim().toLowerCase();

    search.set('query', value);

    if (!(search.get('query') || '').trim()) {
      search.delete('query');
    }

    historyPushWithDebounce();
  };

  return (
    <div>
      <section className="header">
        <h1>People table</h1>
        <input
          className="header__input"
          type="text"
          placeholder="Search by name"
          onChange={searchPeople}
        />
      </section>

      <PeopleTable
        people={people}
        history={history}
        location={location}
        match={match}
      />
    </div>
  );
};

export default PeoplePage;

PeoplePage.propTypes = {
  history: PropTypes.shape({}).isRequired,
  location: PropTypes.shape({}).isRequired,
  match: PropTypes.shape({}).isRequired,
};
