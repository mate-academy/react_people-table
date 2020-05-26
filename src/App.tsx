import React from 'react';
import {
  Route, Switch, NavLink, Redirect,
} from 'react-router-dom';
import { Home } from './Components/Home';
import { PeoplePage } from './Components/PeoplePage';

import './App.css';

const App = () => (
  <div className="App">
    <header className="header">
      <nav className="nav">
        <ul className="nav__list">
          <li className="nav__item">
            <NavLink
              to="/"
              exact
              className="nav__link"
              activeClassName="nav__link--active"
            >
              Home page
            </NavLink>
          </li>
          <li className="nav__item">
            <NavLink
              to="/people"
              className="nav__link"
              activeClassName="nav__link--active"
            >
              People page
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
    <Switch>
      <Route path="/" exact component={Home} />
      <Redirect from="/home" to="/" />
      <Route path="/people/:personSlug?" component={PeoplePage} />
      <>
        <h2>Page not found</h2>
      </>
    </Switch>
  </div>
);

export default App;
