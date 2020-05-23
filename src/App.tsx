import React from 'react';
import {
  Route,
  NavLink,
  Switch,
  Redirect,
} from 'react-router-dom';
import './App.css';
import { Home } from './components/Home';
import { NotFoundPage } from './components/NotFoundPage';
import { PeoplePage } from './components/PeoplePage';

const App: React.FC = () => {
  return (
    <>
      <header>
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
                to="/people"
                className="nav__link"
                activeClassName="nav__link--active"
              >
                People Page
              </NavLink>
            </li>
          </ul>
        </nav>
      </header>
      <main>
        <Switch>
          <Route
            path="/"
            exact
            component={Home}
          />
          <Redirect from="/home" to="/" />
          <Route
            path="/people/:personName?"
            component={PeoplePage}
          />
          <Route component={NotFoundPage} />
        </Switch>
      </main>
    </>
  );
};

export default App;
