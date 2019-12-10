import React from 'react';

import './App.scss';

import peopleFromServer from './people';
import PeopleTable from './components/PeopleTable';

const addPeopleFields = peopleArr => (
  peopleArr.map(
    (person, index) => ({
      id: index + 1,
      ...person,
      age: person.died - person.born,
      century: Math.ceil(person.died / 100),
    })
  )
);

const App = () => (
  <div className="App">
    <h1 className="main-title">People table</h1>
    <p className="table-info">
      Number of people:
      {peopleFromServer.length}
    </p>

    <PeopleTable people={addPeopleFields(peopleFromServer)} />
  </div>
);

export default App;
