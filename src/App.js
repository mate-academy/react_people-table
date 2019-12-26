import React from 'react';
import { Route, Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import './style.scss';
import peopleFromServer from './people';
import PeopleTable from './components/PeopleTable';

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

const App = () => (
  <>
    <Link to="/people">People</Link>

    <Route path="/people/:person?" component={PeoplePage} />
  </>
);

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

  return (
    <div className="App">
      <section className="header">
        <h1>People table</h1>
        <input
          className="header__input"
          type="text"
          placeholder="Search by name"
          onChange={(event) => {
            search.set('query', event.target.value);
            history.push({ search: search.toString() });
          }}
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

PeoplePage.propTypes = {
  history: PropTypes.shape({}).isRequired,
  location: PropTypes.shape({}).isRequired,
  match: PropTypes.shape({}).isRequired,
};

export default App;
