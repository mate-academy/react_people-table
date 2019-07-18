import React from 'react';
import './App.css';
import PeopleTable from './PeopleTable';

const getPeopleFromServer = async () => {
  const link = 'https://mate-academy.github.io/react_people-table/api/people.json';
  const response = await fetch(link);
  const peopleFromServer = await response.json();

  return peopleFromServer.map((person, index) => ({
    id: index + 1,
    ...person,
    age: person.died - person.born,
    century: Math.ceil(person.died / 100),
    children: peopleFromServer
      .filter(child => (
        child.father === person.name || child.mother === person.name
      ))
      .map(child => child.name).join(', '),
  }));
};

class App extends React.Component {
  state = {
    people: [],
  };

  async componentDidMount() {
    const people = await getPeopleFromServer();

    this.setState({ people });
  }

  render() {
    const { people } = this.state;

    return (
      <div className="App">
        <h1>
          Number of People:
          {people.length}
        </h1>
        <PeopleTable people={people} />
      </div>
    );
  }
}

export default App;
