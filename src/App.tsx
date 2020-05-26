import React from 'react';
import {
  HashRouter,
  Switch,
  Route,
  NavLink,
  Redirect,
} from 'react-router-dom';
import { HomePage } from './components/HomePage';
import { PeoplePage } from './components/PeoplePage';
import './App.scss';

const App: React.FC = () => (
  <HashRouter>
    <div className="App">
      <h1>People table</h1>
      <NavLink to="/" exact>Transfer to Home</NavLink>
      <NavLink to="/people">Transfer to People</NavLink>
      <Switch>
        <Route path="/" exact component={HomePage} />
        <Route path="/home"><Redirect to="/" /></Route>
        <Route path="/people/:personSlug?" component={PeoplePage} />
        <>
          <h2>Requested page has not been created yet</h2>
        </>
      </Switch>
    </div>
  </HashRouter>
);

export default App;
