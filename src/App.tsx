import React from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';

import HomePage from './components/HomePage/HomePage';
import PeoplePage from './components/PeoplePage/PeoplePage';
import NotFondPage from './components/NotFoundPage/NotFoundPage';
import Header from './components/Header/Header';

import './App.css';

const App = () => (

  <div className="App">
    <Header />

    <Switch>
      <Route path="/" exact component={HomePage} />
      <Route path="/people/:slug?" component={PeoplePage} />
      <Route component={NotFondPage} />

      <Redirect from="/home" to="/"/>
    </Switch>
  </div>




);

export default App;
