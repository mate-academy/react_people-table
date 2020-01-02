import React, { useState } from 'react';
import { Route, NavLink, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import peopleFromServer from './api/people';
import PeopleTable from './PeopleTable';
import './app.scss';
import NewPerson from './NewPerson';

const initialPeople = peopleFromServer
  .map((person, i) => ({
    id: i + 1,
    ...person,
    age: person.died - person.born,
    century: Math.ceil(person.died / 100),
    children: peopleFromServer
      .filter(child => child.mother === person.name
        || child.father === person.name)
      .map(child => child.name),
  }));

const App = ({ history, location }) => {
  const [people, setPeople] = useState([...initialPeople]);

  const handleAddingPerson = (person) => {
    const newPeople = [...people, person].map(parent => (
      {
        ...parent,
        children: (person.father + person.mother).includes(parent.name)
          ? [...parent.children, person.name]
          : parent.children,
      }));

    setPeople(newPeople);

    history.push({ pathname: '/people' });
  };

  const params = new URLSearchParams(location.search);

  const sortHandler = (field) => {
    if (params.get('sortBy') === field) {
      params.set('sortOrder',
        params.get('sortOrder') === 'asc' ? 'desc' : 'asc');
    } else {
      params.set('sortOrder', 'asc');
    }

    params.set('sortBy', `${field}`);
    history.push({ search: `?${params.toString()}` });
  };

  const getSortedPeople = (peopleArr, field) => (
    peopleArr.sort((person1, person2) => {
      if (!person1[field]) {
        return 1;
      }

      if (!person2[field]) {
        return -1;
      }

      switch (typeof person1[field]) {
        case 'string':
          return person1[field].localeCompare(person2[field]);
        default:
          return person1[field] - person2[field];
      }
    })
  );

  let sortedPeople;

  switch (params.get('sortOrder')) {
    case 'asc':
      sortedPeople = getSortedPeople([...people], params.get('sortBy'));
      break;
    case 'desc':
      sortedPeople
        = getSortedPeople([...people], params.get('sortBy')).reverse();
      break;
    default:
      sortedPeople = [...people];
  }

  return (
    <div className="App">
      <NavLink
        to="/people"
        exact
        className="nav__link"
        activeClassName="nav__item_active"
      >
               People
      </NavLink>
      <Route
        path="/people"
        render={match => (
          <>
            <Route
              path="/people/new"
              render={() => (
                <NewPerson
                  people={people}
                  addPerson={handleAddingPerson}
                />
              )}
            />
            {location.pathname !== '/people/new' && (
              <>
                <NavLink
                  to="/people/new"
                  exact
                  className="nav__link"
                  activeClassName="nav__item_active"
                >
                  New Person
                </NavLink>
                <PeopleTable
                  match={match}
                  people={sortedPeople}
                  query={(params.get('query') || '')}
                  sortHandler={sortHandler}
                  handleAddingPerson={handleAddingPerson}
                />
              </>
            )}
          </>
        )}
      />
    </div>
  );
};

App.propTypes = {
  history: PropTypes.shape({
    location: PropTypes.shape({}).isRequired,
  }).isRequired,
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
  }).isRequired,
};

export default withRouter(App);
