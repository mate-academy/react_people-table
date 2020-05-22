import React, { useEffect, useState } from 'react';
import { Route, NavLink } from 'react-router-dom';
import './App.css';
import { Home } from './components/Home';

const API_URL = 'https://mate-academy.github.io/react_people-table/api/people.json';
const getPeople = (): Promise<Person[]> => {
  return fetch(API_URL)
    .then(res => res.json());
};

interface Person {
  name: string;
  sex: string;
  born: number;
  died: number;
  fatherName: string;
  motherName: string;
  slug: string;
}

const App: React.FC = () => {
  const [people, setPeople] = useState<Person[]>([]);

  useEffect(() => {
    getPeople().then(setPeople);
  }, []);

  return (
    <>
      <nav className="nav">
        <ul className="nav__list">
          <li className="nav__item">
            <NavLink
              to="/"
              exact
              className="nav__link"
              activeClassName="nav__link--active"
            >
              Home
            </NavLink>
          </li>
          <li className="nav__item">
            <NavLink
              to="/people/:id?"
              className="nav__link"
              activeClassName="nav__link--active"
            >
              People Page
            </NavLink>
          </li>
        </ul>
      </nav>
      <Route
        path="/:home?"
        exact
        component={Home}
        // render={({ match }) => (
        //   <Home match={match} />
        // )}
      />
      <Route
        path="/people/:id?"
        render={() => (
          <>
            <h2>People Table</h2>
            <ul>
              {people.map(person => (
                <li key={person.name}>
                  {person.name}
                  {' -- '}
                  {person.sex}
                  {' -- '}
                  {person.born}
                  {' -- '}
                  {person.died}
                  {' -- '}
                  {person.fatherName}
                  {' -- '}
                  {person.motherName}
                  {' -- '}
                  {person.slug}
                </li>
              ))}
            </ul>
          </>
        )}
      />
    </>
  );
};

export default App;
