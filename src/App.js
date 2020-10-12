import React from 'react';
import { NavLink, Switch, Route, Redirect } from 'react-router-dom';
import { Home } from './components/HomePage/Home';
import { Peoples } from './components/PeoplePage/Peoples';
import { PageNotFound } from './components/PageNotFound/PageNotFound';

import './App.scss';

const App = () => (
  <div className="App">
    <nav>
      <ul>
        <li><NavLink to="/">Home Page</NavLink></li>
        <li><NavLink to="/peoples">Peoples Page</NavLink></li>
      </ul>
    </nav>
    <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/home">
        <Redirect to="/" />
      </Route>
      <Route path="/peoples" component={Peoples} />
      <Route path="*" component={PageNotFound} />
    </Switch>
  </div>
);

export default App;
