import React from 'react';
import './App.css';
import { Switch, Route, NavLink, HashRouter } from 'react-router-dom';
import PeoplePage from './PeoplePage';

const App = () => (
  <div className="App">
    <h1>People table</h1>
    <HashRouter>
      <p className="ui secondary  menu">
        <NavLink className="item" to="/" exact>Home</NavLink>
        <NavLink to="/people" exact className="item">People</NavLink>
      </p>
      <Switch>
        <Route exact path="/" render={() => (<></>)} />
        <Route path="/people/:name?" component={PeoplePage} />
      </Switch>
    </HashRouter>
  </div>
);

export default App;
