import React, { useState, useEffect } from 'react';
import { Switch, Route } from 'react-router-dom';
import { Navigation } from './Components/Navigation/Navigation';
import { PeopleTable } from './Components/PeopleTable/PeopleTable';

import { getPeople, Person } from './helpers';

import './App.scss';

const App: React.FC = () => {
  const [people, setPeople] = useState<Person[]>([]);

  useEffect(() => {
    getPeople()
      .then(data => setPeople(data));
  }, []);

  return (
    <div className="App">
      <Navigation />
      <Switch>
        <Route path="/" exact component={() => <h1>Home</h1>} />
        <Route
          path="/people/:personSlug?"
          render={() => <PeopleTable people={people} />}
        />
        <Route component={() => <h1>Not found</h1>} />
      </Switch>
    </div>
  );
};


export default App;
