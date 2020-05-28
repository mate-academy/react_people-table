import React/* , { useState, useEffect } */ from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import './App.scss';

import Nav from './components/Nav';
import PeoplePage from './components/PeoplePage';

const App = () => {
  return (
    <div className="App">
      <header className="header">
        <Nav />
      </header>

      <main className="main">
        <Switch>
          <Route path="/" exact component={() => <h2>Home</h2>} />
          <Redirect from="/home" to="/" />
          <Route path="/people/:personSlug?" component={PeoplePage} />
          <Route component={() => <h1>Page not found</h1>} />
        </Switch>
      </main>
    </div>
  );
};

export default App;
