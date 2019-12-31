import React from 'react';
import { Route, Switch, Link } from 'react-router-dom';
import './style.css';
import PeopleTable from './PeopleTable';

const App = () => (
  <div className="App">
    <Link to="/" exact activeClassName="active" />
    <Switch>
      <Route path="/" exact component={HomePage} />
      <Route path="/people/:selectedUser?" component={PeopleTable} />
    </Switch>
  </div>
);

const HomePage = () => (
  <>
    <Link to="/people" className="btn">
      PEOPLE
    </Link>
    <h1 className="home-page">Home page</h1>
  </>
);

export default App;
