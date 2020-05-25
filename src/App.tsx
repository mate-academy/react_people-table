import React from 'react';

import {
  Route,
  Switch,
  NavLink,
} from 'react-router-dom';

import './App.css';
import People from './components/People';

const App = () => (
  <div className="App">
    <header className="header">
      <h1 className="header__title">Tabs with router</h1>
      <nav className="nav">
        <ul className="nav__list">
          <li className="nav__item">
            <NavLink className="nav__link" to="/" exact>
              HomePage
            </NavLink>
          </li>
          <li className="nav__item">
            <NavLink className="nav__link" to="/people">
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
          <People currentPerson={match.params.id} />
        )}
      />
      <Route>
        <h1>Page not found</h1>
      </Route>
    </Switch>
  </div>
);

export default App;
