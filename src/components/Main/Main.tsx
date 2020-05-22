import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import HomePage from '../HomePage';
import PeoplePage from '../PeoplePege';
import './Main.scss';

const Main = () => {
  return (
    <div className="Main">
      <Switch>
        <Route
          path="/people/:personName?"
          component={PeoplePage}
        />

        <Route path="/" exact>
          <HomePage />
        </Route>

        <Redirect from="/home" to="/" />

        <h1>Not found</h1>
      </Switch>
    </div>
  );
};

export default Main;
