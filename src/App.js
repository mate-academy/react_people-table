import React from 'react';
import { Link, Route } from 'react-router-dom';
import './App.scss';
import PeoplePage from './PeoplePage';

const App = () => (
  <>
    <Link to="/people">People</Link>
    <Route path="/people/:person?" component={PeoplePage} />
  </>
);

export default App;
