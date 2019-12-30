import React from 'react';
import { NavLink, Switch, Route } from 'react-router-dom';
import './App.scss';
import HomePage from './components/HomePage';
import PeopleTablePage from './components/PeopleTablePage';

const App = () => (
  <div className="nav">
    <ul className="nav__list">
      <li className="nav__item">
        <NavLink
          className="nav__link"
          activeClassName="nav__link--active"
          exact
          to="/"
        >
          Home
        </NavLink>
      </li>

      <li className="nav__item">
        <NavLink
          className="nav__link"
          activeClassName="nav__link--active"
          to="/people"
        >
          People Table
        </NavLink>
      </li>
    </ul>

    <Switch>
      <Route path="/" exact component={HomePage} />
      <Route path="/people" component={PeopleTablePage} />
    </Switch>
  </div>
);

export default App;
