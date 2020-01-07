import React from 'react';
import { NavLink, Route, Switch } from 'react-router-dom';
import PeopleList from './PeopleList';
import './App.css';

const App = () => (
  <div className="container">
    <NavLink
      className="link"
      to="/"
      exact
    >
Home
    </NavLink>
    <NavLink className="link" to="/people">People Table</NavLink>
    <Switch>
      <Route path="/" exact render={() => <h1>Home Page</h1>} />
      <Route path="/people/:name?" component={PeopleList} />
    </Switch>
  </div>
);

export default App;
