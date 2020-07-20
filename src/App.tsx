import React, { useState, useEffect } from 'react';
import { Switch, Route, NavLink, Redirect } from 'react-router-dom';
import { peopleUrl, fetchData } from './Api';
import { Person } from './interfaces';
import { Table } from './Table';
import { HomePage, NotFoundPage } from './HomePage';


import './App.css';

const App = () => {
  const [people, setPeople] = useState<Person[]>([]);

  useEffect(() => {
    const getUsers = async () => {
      const users = await fetchData<Person>(peopleUrl);
      setPeople(users);
    };

    getUsers();
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
        <Route path="/" exact component={HomePage} />
        <Route path="/home"><Redirect to="/" /></Route>
        <Route
          path="/users/:id?"
          render={
            ({ match }) => (
              <Table
                list={people}
                id={match.params.id}
              />
            )
          }
        />
        <Route component={NotFoundPage} />
      </Switch>
    </div>
  );
};

export default App;
