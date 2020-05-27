import React from 'react';

import {
  Route,
  Switch,
  NavLink,
  Redirect,
} from 'react-router-dom';

import './App.css';
import PeopleTable from './components/PeopleTable';

const App = () => (
  <div className="App">
    <header className="header">
      <h1 className="header__title">Tabs with router</h1>
      <nav className="nav">
        <ul className="nav__list">
          <li className="nav__item">
            <NavLink
              className="nav__link"
              to="/"
              exact
              activeClassName="nav__link--active"
            >
              HomePage
            </NavLink>
          </li>
          <li className="nav__item">
            <NavLink
              className="nav__link"
              to="/people"
              activeClassName="nav__link--active"
            >
              PeoplePage
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
    <Switch>
      <Route path="/" exact>
        <div className="page">
          <h2 className="page__title">
            Home page
          </h2>
        </div>
      </Route>
      <Route
        path="/people/:personName?"
        render={({ match }) => (
          <PeopleTable currentPerson={match.params.personName} />
        )}
      />
      <Redirect from="/home" to="/" />
      <Route>
        <h1>Page not found</h1>
      </Route>
    </Switch>
  </div>
);

export default App;
