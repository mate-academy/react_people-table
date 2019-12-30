import React from 'react';
import { Route, NavLink } from 'react-router-dom';
import './App.css';
import PeopleTable from './PeopleTable';

const App = () => (
  <div className="people">
    <NavLink to="/people" className="people__link">People</NavLink>
    <Route path="/people/:personName?" component={PeopleTable} />
  </div>
);

export default App;
