import React from 'react';
import { NavLink, Switch, Route } from 'react-router-dom';
import './App.css';
import HomePage from './Components/HomePages';
import PeopleTablePages from './Components/PeopleTablePages';

const App = () => (
  <div>
    <ul>
      <li>
        <NavLink exact to="/">
          Home
        </NavLink>
      </li>

      <li>
        <NavLink to="/people">
          People Tables
        </NavLink>
      </li>
    </ul>

    <Switch>
      <Route path="/" exact component={HomePage} />
      <Route path="/people" component={PeopleTablePages} />
    </Switch>
  </div>
);

export default App;
