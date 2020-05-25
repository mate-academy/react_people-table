import React, { useState, useEffect } from 'react';

import './App.css';
import { Route, Switch } from 'react-router-dom';
import { peopleFromServer } from './API';
import Table from './components/Table';
import Header from './components/Header/Header';


const App = () => {
  const [people, setPeople] = useState<PersonWithId[]>([]);

  useEffect(() => {
    peopleFromServer.then(result => (
      setPeople(result.map((person, index) => (
        {
          ...person,
          id: index + 1,
          father: result.find(personFather => personFather.name === person.fatherName),
          mother: result.find(personMother => personMother.name === person.motherName),
        }
      )))
    ));
  }, []);


  console.log(people)

  return (
    <div className="App">
      <Header />
      <Switch>
        <Route
          path="/"
          exact
          render={() => (
            <h1>Home</h1>
          )}
        />
        <Route
          path="/people/:name?"
          render={() => <Table people={people} />}
        />
        <h1>Not Found</h1>
      </Switch>
    </div>
  );
};

export default App;
