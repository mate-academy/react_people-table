import React, { useState, useEffect } from 'react';
import { Route, HashRouter } from 'react-router-dom';
import PeopleTable from './PeopleTable';
import peopleFromServer from './people';
import './App.css';

const App = () => {
  const [visiblePeople, setVisiblePeople] = useState([]);

  const setPreparedPeople = () => {
    const preparedPeople = peopleFromServer.map((person, i) => ({
      ...person,
      age: person.died - person.born,
      id: i + 1,
      century: Math.ceil(person.died / 100),
      children: peopleFromServer
        .filter(child => person.name === child.father
          || person.name === child.mother),
    }));

    setVisiblePeople(preparedPeople);
  };

  useEffect(
    () => setPreparedPeople(),
    []
  );

  return (
    <div className="App">
      <HashRouter>
        <Route
          path="/people/:name?"
          render={props => (
            <PeopleTable {...props} people={visiblePeople} />
          )}
        />
      </HashRouter>
    </div>
  );
};

export default App;
