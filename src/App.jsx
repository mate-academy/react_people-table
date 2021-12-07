import React from 'react';
import { Route, NavLink, Switch } from 'react-router-dom';
import { HomePage } from './components/HomePage';
import { PeoplePage } from './components/PeoplePage';
import './App.scss';

const App = () => (
  <div className="App">
    <nav className="nav">
      <NavLink
        to="/"
        activeClassName="active"
        className="nav__link"
      >
        Home
      </NavLink>
      <NavLink
        to="/people"
        activeClassName="active"
        className="nav__link"
      >
        People
      </NavLink>
    </nav>
    <Switch>
      <Route path="/" exact component={HomePage} />
      <Route path="/people" component={PeoplePage} />
    </Switch>
  </div>
);

export default App;
