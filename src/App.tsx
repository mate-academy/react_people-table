import React from 'react';

import { Route, Switch, Redirect } from 'react-router-dom';
import { Header } from './components/Header';
import { PeopleTable } from './components/PeopleTable';

import './App.scss';


const App = () => {
  return (
    <div className="App">
      <Header />
      <Switch>
        <Route path="/" exact render={() => <h1>Home</h1>} />
        <Route path="/people" component={PeopleTable} />
        <Redirect from="/home" to="/" />
        <Route>
          <h1>Page not found</h1>
        </Route>
      </Switch>
    </div>
  );
};

export default App;
