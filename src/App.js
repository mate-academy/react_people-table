import React from 'react';
import { HashRouter, NavLink, Route } from 'react-router-dom';
import './App.css';
import TablePage from './TablePage';

const App = () => (
  <div className="App">
    <HashRouter>
      <NavLink
        to="/home"
        className="link"
        activeClassName="link--active"
        exact
      >
        Home
      </NavLink>
      <NavLink
        to="/table"
        className="link"
        activeClassName="link--active"
      >
        Table
      </NavLink>

      <Route path="/home">
        <h1>Home</h1>
      </Route>
      <Route path="/table/:personName?" component={TablePage} />

    </HashRouter>
  </div>
);

export default App;
