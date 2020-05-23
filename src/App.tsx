import React, { useEffect, useState } from 'react';
import {
  NavLink,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import { getData } from './api';
import './App.css';
import { PeopleTable } from './PeopleTable';

const App = () => {
  const [people, setPeople] = useState<PeopleTable[]>([]);

  useEffect(() => {
    getData().then((data) => {
      setPeople(data);
    });
  }, []);

  return (
    <div className="App">
      <header>
        <ul>
          <li className="header--item">
            <NavLink to="/" exact className="header--link">HOME</NavLink>
          </li>
          <li className="header--item">
            <NavLink to="/people" className="header--link">PEOPLE</NavLink>
          </li>
        </ul>
        <h1 className="header--head">
People table
          {people.length}
        </h1>
      </header>

      <Switch>
        <Route path="/" exact>
          <h2 className="head--home-page">HomePage</h2>
        </Route>
        <Route
          path="/people/:name?"
          render={() => (
            <PeopleTable people={people} />
          )}
        />
        <Redirect from="/home" to="/" />
        <Route>
          <h1>Page not found</h1>
        </Route>
      </Switch>
    </div>
  );
};

export default App;
