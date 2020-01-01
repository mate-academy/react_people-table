import React from 'react';
import { HashRouter, Route, NavLink } from 'react-router-dom';
import UnityComponent from './UnityComponent';

const App = () => (
  <HashRouter>
    <div className="App">
      <NavLink
        to="/"
        exact
        className="link"
        activeClassName="active__link"
      >
        Home
      </NavLink>
      <NavLink
        to="/people"
        exact
        className="link"
        activeClassName="active__link"
      >
        people list
      </NavLink>
      <Route path="/people" component={UnityComponent} />
    </div>
  </HashRouter>
);

export default App;
