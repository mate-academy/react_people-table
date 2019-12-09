import React from 'react';
import People from './people';
import './App.scss';
import PeopleTable from './PeopleTable';

class App extends React.Component {
  peopleWithId = peopleList => peopleList.map(
    (person, i) => ({
      ...person,
      id: i,
      age: person.died - person.born,
      century: Math.ceil(person.died / 100),
    })
  );

  render() {
    return (
      <div className="App">
        <h1>
          People table
          {' '}
          { People.length }
        </h1>
        <PeopleTable people={this.peopleWithId(People)} />
      </div>
    );
  }
}

export default App;
