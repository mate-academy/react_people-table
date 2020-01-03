import React from 'react';
import { NavLink, Route } from 'react-router-dom';
import PeoplePage from './PeoplePage';
import './App.css';

const App = () => (
  <div className="App">
    <NavLink className="People--button" to="/people">People</NavLink>

    <Route path="/people/:personName?" exact component={PeoplePage} />
  </div>

);

export default App;
