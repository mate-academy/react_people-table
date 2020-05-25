import React from 'react';

import './App.scss';

import { Route, Switch } from 'react-router-dom';
import { NavLinks } from './components/navigation/NavLinks';
import { HomePage } from './components/navigation/HomePage';
import { PeoplePage } from './components/navigation/PeoplePage';

const App = () => {
  return (
    <div className="app">
      <NavLinks />
      <Switch>
        <Route path="/" exact component={HomePage} />
        <Route path="/people" component={PeoplePage} />
      </Switch>
    </div>
  );
};

export default App;
