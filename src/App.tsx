import React from 'react';
import { Switch, Route, Link } from 'react-router-dom';

import './App.css';
import { People } from './components/People/People';
import { LostPage } from './components/LostPage/LostPage';

const App = () => (
  <div className="App">
    <nav>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/people">People</Link></li>
      </ul>
    </nav>

    <Switch>
      <Route exact path="/"><h1>Home page</h1></Route>
      <Route path="/people"><People /></Route>
      <Route path="*"><LostPage /></Route>
    </Switch>
  </div>
);

export default App;
