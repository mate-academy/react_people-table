
import React from 'react';
import {
  Route, NavLink, Redirect, Switch,
} from 'react-router-dom';

import './App.css';
import { PeoplePage } from './PeoplePage';

const HomePage = () => (
  <h3 className="title is-2 is-spaced header">Home</h3>
);

const App = () => (
  <>
    <nav className="menu">
      <ul className="menu-list">
        <li>
          <NavLink to="/" exact className="nav__link">
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to="/people" className="nav__link">
            PeoplePage
          </NavLink>
        </li>
      </ul>
    </nav>
    <Switch>
      <Route path="/" exact component={HomePage} />
      <Redirect from="/home" to="/" />
      <Route
        path="/people/:slug?"
        component={PeoplePage}
      />
      <Route component={() => <h3 className="title is-2 is-spaced header">Page not found</h3>} />
    </Switch>
  </>
);

export default App;
