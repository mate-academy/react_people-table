import React from 'react';
import './App.css';
import PeopleTable from './PeopleTable';

const getPeople = async() => {
  const Api = 'https://mate-academy.github.io/react_people-table/api/';
  return fetch(`${Api}/people.json`).then(respose => respose.json());
};

class App extends React.Component {
  state = {
    people: [],
  }

  async componentDidMount() {
    const people = await getPeople();
    const peopleWithAge = people.map(person => ({
      ...person,
      age: person.died - person.born,
      century: Math.ceil(person.died / 100),
      children: people
        .filter(kidd => kidd.father === person.name
          || kidd.mother === person.name)
        .map(child => child.name),
    }));

    this.setState({
      people: peopleWithAge,
    });
  }

  render() {
    return (
      <div className="App">
        <h1>
        People table
          { this.state.people.length }
        </h1>
        <PeopleTable peoples={this.state.people} />
      </div>
    );
  }
}

export default App;
