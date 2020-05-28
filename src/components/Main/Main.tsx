import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import HomePage from '../HomePage';
import PeoplePage from '../PeoplePege';
import ErrorPage from '../ErrorPage';
import './Main.scss';

type Props = {
  people: Person[];
};

const Main: React.FC<Props> = ({ people }) => {
  return (
    <div className="Main">
      <Switch>
        <Route
          path="/people/:personName?"
          render={() => (
            <PeoplePage people={people} />
          )}
        />

        <Route path="/" exact>
          <HomePage />
        </Route>
        <Redirect from="/home" to="/" />

        <Route path="/error">
          <ErrorPage message="Not found" />
        </Route>
        <Redirect from="/*" to="/error" />

      </Switch>
    </div>
  );
};

export default Main;
