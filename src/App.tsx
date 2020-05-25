import React, { useState, useEffect } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import { getPeople } from './helper/api';

import './App.css';


import { HomePage } from './components/HomePage';
import { Header } from './components/Header';
import { PeopleTable } from './components/PeopleTable';

const App = () => {
  const [people, setPeople] = useState<PersonCompleted[]>([]);

  useEffect(() => {
    getPeople()
      .then(result => (
        setPeople(result.map((person: PersonCompleted) => (
          {
            ...person,
            father: result.find((f: PersonCompleted) => f.name === person.fatherName),
            mother: result.find((m: PersonCompleted) => m.name === person.motherName),
          }
        )))
      ));
  }, []);

  return (
    <div className="App">
      <Header />

      <div className="container content-container">
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route
            path="/people/:personName?"
            render={() => (
              <PeopleTable people={people} />)}
          />
          <Redirect from="/home" to="/" />
          <Route>
            <h1>Page not found</h1>
          </Route>
        </Switch>
      </div>
    </div>
  );
};

export default App;
