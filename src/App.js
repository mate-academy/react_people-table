import React from 'react';
import { NavLink, Switch, Route, Redirect } from 'react-router-dom';
import { Home } from './components/HomePage/Home';
import { Peoples } from './components/PeoplePage/PeopleTable';
import { PageNotFound } from './components/PageNotFound/PageNotFound';

import './App.scss';

const App = () => (
  <div className="App">

    <nav className="nav">
      <ul className="nav__block">
        <li className="nav__item">
          <NavLink className="nav__link" to="/" exact>Home Page</NavLink>
        </li>
        <li className="nav__item">
          <NavLink className="nav__link" to="/peoples">Peoples Page</NavLink>
        </li>
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
