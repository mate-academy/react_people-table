import React, { useState, useEffect } from 'react';
import {
  NavLink, Route, Switch, Redirect,
} from 'react-router-dom';

import './App.css';
import HomePage from './components/HomePage/HomePage';
import PeoplePage from './components/PeoplePage/PeoplePage';
import { peopleFromServer } from './API';

const App = () => {
  const [people, setPeople] = useState<PersonWithParents[]>([]);

  useEffect(() => {
    peopleFromServer.then(result => (
      setPeople(result.map((person: Person, index: number) => ({
        id: index + 1,
        ...person,
        age: person.died - person.born,
        century: Math.ceil(person.died / 100),
        mather: result.find(el => person.motherName === el.name),
        father: result.find(el => person.fatherName === el.name),
      })))
    ));
  }, []);


  return (
    <div>
      <nav className="nav">
        <ul className="nav__list">
          <li className="nav__item">
            <NavLink to="/" className="nav__link">
              Home Page
            </NavLink>
          </li>

          <li className="nav__item">
            <NavLink to="/people" className="nav__link">
              People Page
            </NavLink>
          </li>
        </ul>
      </nav>

      <Switch>
        <Route path="/" exact component={HomePage} />

        <Route
          path="/people:name?"
          render={() => (
            <PeoplePage people={people} />
          )}
        />

        <Redirect
          from="/home"
          to="/"
        />

        <h1 className="pageNotFound">Page not found</h1>
      </Switch>
    </div>
  );
};

export default App;
