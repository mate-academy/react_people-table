import React from 'react';
import PropTypes from 'prop-types';

import './App.css';

const getPeople = async() => {
  const url
    = 'https://mate-academy.github.io/react_people-table/api/people.json';
  const response = await fetch(url);
  const people = await response.json();

  return people.map((person, index) => ({
    id: index + 1,
    ...person,
    age: person.died - person.born,
    century: Math.ceil(person.died / 100),
  }));
};

class App extends React.Component {
  state = {
    people: [],
  };

  async componentDidMount() {
    const people = await getPeople();

    this.setState({ people });
  }

  render() {
    const { people } = this.state;

    return (
      <div className="App">
        <h1>
          Number of people:
          &nbsp;
          {people.length}
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
        <th>ID</th>
        <th>Name</th>
        <th>Sex</th>
        <th>Born</th>
        <th>Died</th>
        <th>Age</th>
        <th>Century</th>
        <th>Mother</th>
        <th>Father</th>
        <th>Children</th>
      </tr>
    </thead>
    <tbody>
      {people.map(person => (
        <tr key={person.id}>
          <td>{person.id}</td>
          <td>{person.name}</td>
          <td>{person.sex}</td>
          <td>{person.born}</td>
          <td>{person.died}</td>
          <td>{person.age}</td>
          <td>{person.century}</td>
          <td>{person.mother}</td>
          <td>{person.father}</td>
          <td>{person.children}</td>
        </tr>
      ))}
    </tbody>
  </table>
);

PeopleTable.propTypes = {
  people: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default App;
