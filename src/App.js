import React from 'react';
import { NavLink, Route, Switch, HashRouter } from 'react-router-dom';
import PeoplePage from './PeoplePage';
import './App.css';

const App = () => (
  <div className="App">
    <HashRouter>
      <h1 className="title">People table</h1>
      <NavLink className="nav-link" to="/" exact>
        Home
      </NavLink>
      <NavLink className="nav-link" to="/people">PeopleTable</NavLink>
      <Switch>
        <Route
          path="/"
          exact
          render={() => (
            <div>
              <h1 className="home">Home</h1>
              <div className="image" />
            </div>
          )}
        />
        <Route path="/people/:personName?" component={PeoplePage} />
      </Switch>
    </HashRouter>

  </div>
);

export default App;
