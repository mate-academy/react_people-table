import React from 'react';
import { Link, Redirect, Route, Switch } from 'react-router-dom';

import './App.scss';
import { NotFoundPage } from './components/NotFoundPage';
import { PeoplePage } from './components/PeoplePage';

const App = () => (
  <div className="App">
    <header>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/people">People</Link>
          </li>
        </ul>
      </nav>
    </header>

    <Switch>
      <Route path="/" exact>
        <h1>HomePage</h1>
      </Route>
      <Route path="/home">
        <Redirect to="/" />
      </Route>
      <Route path="/people">
        <PeoplePage />
      </Route>
      <Route path="*">
        <NotFoundPage />
      </Route>
    </Switch>
  </div>
);

export default App;
