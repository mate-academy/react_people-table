import React from 'react';

import './App.css';
import {
  HashRouter,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';

import PeoplePage from './components/PeoplePage';
import Navbar from './components/Navbar';
import HomePage from './components/HomePage';
import PageNotFound from './components/PageNotFound';

const App = () => {
  return (
    <HashRouter>
      <Navbar />
      <Switch>
        <Route path="/" exact component={HomePage} />
        <Route path="/people/:personSlug?" component={PeoplePage} />
        <Route component={PageNotFound} />
        <Redirect path="/home" to="/" />
      </Switch>
    </HashRouter>
  );
};

export default App;
