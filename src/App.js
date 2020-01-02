import React from 'react';
import { Route, NavLink, Switch } from 'react-router-dom';
import PeoplePage from './components/PeoplePage';
import './styles.scss';

const App = () => (
  <>
    <NavLink exact to="/">Home</NavLink>
    <NavLink to="/people">People</NavLink>
    <Switch>
      <Route path="/" exact render={() => <h1>Home Page</h1>} />
      <Route path="/people/:person?" component={PeoplePage} />
    </Switch>
  </>
);

export default App;
