import React, { useState, useEffect } from 'react';
import './app.css';
import { Route, Link } from 'react-router-dom';
import PeopleTable from './PeopleTable';

import { getPeople } from './PeopleAPI';

const App = () => {
  const [people, setPeople] = useState([]);

  useEffect(() => {
    getPeople().then((peopleFromServer) => {
      const preparedPeople = peopleFromServer.map((person, i) => ({
        ...person,
        id: i + 1,
        age: person.died - person.born,
        century: Math.ceil(person.died / 100),
        children: peopleFromServer
          .filter(child => child.mother === person.name
            || child.father === person.name),
      }));

      setPeople(preparedPeople);
    });
  }, []);

  return (
    <div className="App">
      <Link to="/people" className="start">People table</Link>
      <Route
        path="/people/:name?"
        render={({ match }) => (<PeopleTable people={people} match={match} />)}
      />
    </div>
  );
};

export default App;
