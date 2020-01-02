import React from 'react';
import { Route, Link } from 'react-router-dom';
import './App.css';
import Home from './Home';
import PeoplePage from './PeoplePage';

const App = () => (
  <div className="App">
    <Link to="/" exact className="table__link">Home</Link>
    <Link to="/people" className="table__link">People</Link>

    <Route path="/" exact component={Home} />
    <Route path="/people/:person?" component={PeoplePage} />

  </div>
);

export default App;
