import React from 'react';
import {
  Switch, Route, Redirect,
} from 'react-router-dom';
import './App.css';
import { Header } from './Components/Header';
import { Homepage } from './Components/Homepage';
import { PageNotFound } from './Components/PageNotFound';
import { PeoplePage } from './Components/PeoplePage';

const App: React.FC = () => {
  return (
    <div className="App">
      <Header />
      <Switch>
        <Route
          path="/people/:slug?"
          component={PeoplePage}
        />
        <Route
          path="/"
          exact
          component={Homepage}
        />
        <Redirect
          from="/home"
          to="/"
        />
        <Route
          component={PageNotFound}
        />
      </Switch>
    </div>
  );
};

export default App;
