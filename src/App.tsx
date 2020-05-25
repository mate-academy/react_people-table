import React from 'react';
import {
  HashRouter, Switch, Route, NavLink,
} from 'react-router-dom';
import Home from './Home';
import PeoplePage from './PeoplePage';
import NotFoundPage from './NotFoundPage';

import './App.css';

const App = () => {
  return (
    <>
      <div className="App">
        <h1>People table</h1>
      </div>
      <HashRouter>
        <nav>
          <ul>
            <li><NavLink to="/" exact>Home</NavLink></li>
            <li><NavLink to="/people">PeoplePage</NavLink></li>
          </ul>
        </nav>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/home" component={Home} />
          <Route
            path="/people/:id?"
            render={() => (
              <PeoplePage />
            )}
          />
          <Route path="/" component={NotFoundPage} />
        </Switch>

      </HashRouter>
    </>
  );
};


export default App;
