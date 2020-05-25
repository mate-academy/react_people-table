import React from 'react';
import {
  NavLink, Route, Switch, Redirect,
} from 'react-router-dom';
import HomePage from './HomePage';
import PeopleTable from './PeopleTable';
import './App.scss';

const App = () => {
  return (
    <>
      <nav className="nav">
        <ul className="nav__list">
          <li>
            <NavLink
              to="/"
              exact
              className="nav__link"
              activeClassName="nav__link--active"
            >
            HomePage
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/people"
              className="nav__link"
              activeClassName="nav__link--active"
            >
            PeoplePage
            </NavLink>
          </li>
        </ul>
      </nav>
      <Switch>
        <Route path="/" exact component={HomePage} />
        <Redirect from="/home" to="/" />
        <Route
          exact
          path="/people/:personSlug?"
          component={PeopleTable}
        />
        <h1>Sorry,page not found</h1>
      </Switch>
    </>
  );
};


export default App;
