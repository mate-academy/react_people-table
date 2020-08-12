import React from 'react';
import {
  Link,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import { HomePage } from './components/HomePage';
import { PeoplePage } from './components/PeoplePage';
import { Error404 } from './components/Error404';

import './App.css';

const App: React.FC = () => (
  <div className="App">
    <header className="header">
      <Link to="/" className="nav-link">Home</Link>
      <Link to="/people/" className="nav-link">People</Link>
    </header>
    <Switch>
      <Route exact path="/home"><Redirect to="/" /></Route>
      <Route path="/" exact component={HomePage} />
      <Route path="/people/:personSlug?" component={PeoplePage} />
      <Route path="/:someText" exact component={Error404} />
    </Switch>
  </div>
);

export default App;
