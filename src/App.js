import React from 'react';
import './App.css';

const getPeopleFromServer = async() => {
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
      .map(child => child.name).join('; '),
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
          Number of People: {people.length}
        </h1>
        <PeopleTable people={people} />
      </div>
    );
  }
}

const PeopleTable = ({ people }) => (
  <table className="PeopleTable">
    <thead>
      <tr>
        <th>Id</th>
        <th>Name</th>
        <th>Sex</th>
        <th>Born</th>
        <th>Died</th>
        <th>Mother</th>
        <th>Father</th>
        <th>Age</th>
        <th>Century</th>
        <th>Children</th>
      </tr>
    </thead>
    <tbody>
      {people.map(person => (
        <Person person={person} key={person.id} />
      ))}
    </tbody>
  </table>
);

const Person = ({ person }) => (
  <tr key={person.id}>
    <td>{person.id}</td>
    <td>{person.name}</td>
    <td>{person.sex}</td>
    <td>{person.born}</td>
    <td>{person.died}</td>
    <td>{person.mother}</td>
    <td>{person.father}</td>
    <td>{person.age}</td>
    <td>{person.century}</td>
    <td>{person.children}</td>
  </tr>
);
export default App;
