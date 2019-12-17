import React from 'react';
import './style.css';
import people from './people';
import PeopleTable from './PeopleTable';

const peopleList = peopleArr => (
  peopleArr.map(
    (person, index) => ({
      id: index + 1,
      ...person,
      age: person.died - person.born,
      century: Math.ceil(person.died / 100),
    })
  )
);

const amountOfPeople = peopleList(people).length;

class App extends React.Component {
  state={
    personList: peopleList(people),
  };

  render() {
    const { personList } = this.state;

    return (
      <>
        <h1 className="heading">People table</h1>
        <div className="wrap">
          <h4 className="amountOfPeople">
            Amount:
            {' '}
            {amountOfPeople}
          </h4>
        </div>
        <div className="App">
          <PeopleTable
            people={personList}
          />
        </div>
      </>
    );
  }
}

export default App;
