import React from 'react';
import {
  NavLink, Route, Switch, Redirect,
} from 'react-router-dom';
import './App.scss';
import { PeoplePage } from './PeoplePage';

const HomePage = () => <h2>Home</h2>;

const App = () => (
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
            Home
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/people"
            className="nav__link"
            activeClassName="nav__link--active"
          >
            People
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
        component={PeoplePage}
      />
      <h1>Page not found</h1>
    </Switch>

  </>
);

export default App;
