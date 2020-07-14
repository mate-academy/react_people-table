/* eslint-disable no-console */
import React, { useState, useEffect } from 'react';
import { Switch, Route, NavLink } from 'react-router-dom';
import { peopleUrl, fetchData } from './Api';
import { Person } from './interfaces';
import { Table } from './Table';

import './App.css';

const App = () => {
  const [isLoading, setIsLoading] = useState(false);

  const [people, setPeople] = useState<Person[]>([]);

  useEffect(() => {
    setIsLoading(true);
    const getUsers = async () => {
      const users = await fetchData<Person>(peopleUrl);

      setPeople(users);
    };

    getUsers();
    console.log(people, isLoading);

    setIsLoading(false);
  }, []);

  return (
    <div className="App">
      <h1>People table</h1>
      <nav className="navbar navbar-light bg-light">
        <form className="form-inline">
          <NavLink className="btn btn-outline-success" to="/" exact>Home</NavLink>
          <NavLink className="btn btn-outline-success" to="/users/">People</NavLink>
        </form>
      </nav>
      <Switch>
        <Route
          path="/users/"
          render={
            ({ match }) => <Table list={people} id={match.params.id} path={match.url} />
          }
        />
      </Switch>
    </div>
  );
};

export default App;
