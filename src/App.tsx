import React, { FC } from 'react';
import {
  Route,
  Switch,
  NavLink,
  Redirect,
} from 'react-router-dom';

import './App.css';
import { PeoplePage } from './Components/PeoplePage/PeoplePage';

const Home = () => <h1>Home page</h1>;

const App: FC = () => {
  return (
    <>
      <NavLink to="/" className="btn btn-primary m-2">Home</NavLink>
      <NavLink to="/people" className="btn btn-primary m-2">People</NavLink>
      <Switch>
        <Redirect from="/home" to="/" />
        <Route exact path="/" component={Home} />
        <Route path="/people/:slug?" component={PeoplePage} />
        <Route render={() => <h1>Page not found</h1>} />
      </Switch>
    </>
  );
};

export default App;
