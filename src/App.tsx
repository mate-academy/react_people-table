import React from 'react';
import { Route, Switch } from 'react-router-dom';

import './App.css';

import HomePage from './components/HomePage/HomePage';
import PeoplePage from './components/PeoplePage/PeoplePage';
import NavigationList from './components/NavigationList/NavigationList';

const App = () => (
  <div className="App">
    <NavigationList />
    <Switch>
      <Route path="/" exact component={HomePage} />
      <Route path="/people/:tabId?" exact component={PeoplePage} />
      <Route>
        <h1>
          Page not found!
        </h1>
      </Route>
    </Switch>
  </div>
);

export default App;
