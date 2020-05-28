import React from 'react';
import { Switch, Route, NavLink } from 'react-router-dom';
import Home from './Home';
import PeoplePage from './PeoplePage';
import NotFoundPage from './NotFoundPage';

import './App.css';

const App = () => {
  return (
    <>
      <ul className="nav nav-pills">
        <li className="nav-item">
          <NavLink to="/" exact className="nav-link " activeClassName="active" href="#">Home</NavLink>
        </li>
        <li className="nav-item">
          <NavLink to="/people" className="nav-link " activeClassName="active" href="#">PeoplePage</NavLink>
        </li>
      </ul>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/home" component={Home} />
        <Route
          path="/people/:id?"
          render={() => (
            <PeoplePage />
          )}
        />
        <Route path="/" component={NotFoundPage} />
      </Switch>
    </>
  );
};


export default App;
