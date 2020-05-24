import React from 'react';
import {
  HashRouter,
  Switch,
  Route,
  NavLink,
  Redirect,
} from 'react-router-dom';

import './App.css';

const Home = () => {
  return (
    <h2>Home Page perhaps</h2>
  );
};

const People = () => <h2>People Page perhaps</h2>;

const App = () => (
  <HashRouter>
    <div className="App">
      <h1>People table</h1>
      <NavLink to="/">Transfer to Home</NavLink>
      <NavLink to="/people">Transfer to People</NavLink>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/home"><Redirect to="/" /></Route>
        <Route path="/people" component={People} />
        <>
          <h2>Requested page has not been created yet</h2>
        </>
      </Switch>
    </div>
  </HashRouter>
);

export default App;
