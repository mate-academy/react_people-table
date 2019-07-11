import React from 'react';
import PropTypes from 'prop-types';
import './App.css';

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

    this.setState({
      people,
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

const PeopleTable = ({ peoples }) => (
  <table className="PeopleTable">
    <tr>
      <th>id</th>
      <th>name</th>
      <th className="person--male">sex</th>
      <th>born</th>
      <th>died</th>
      <th>mother</th>
      <th>father</th>
    </tr>
    <tbody>
      {peoples.map((person, index) => (
        <Person person={person} i={index} />
      ))}
    </tbody>
  </table>
);

PeopleTable.propTypes = {
  peoples: PropTypes.arrayOf(PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ])).isRequired,
};

const Person = ({ person, i }) => (
  <tr className="person">
    <td>
      {i + 1}
    </td>
    <td>{person.name}</td>
    <td
      className={person.sex === 'm' ? 'person--male' : 'person--female'}
    >
      {person.sex}
    </td>
    <td
      className={person.born < 1650 ? 'people__Born--Before' : ''}
    >
      {person.born}
    </td>
    <td className={person.died > 1800 ? 'people__Died--Before' : ''}>
      {person.died}
    </td>
    <td>{person.mother}</td>
    <td>{person.father}</td>
  </tr>
);

Person.propTypes = {
  person: PropTypes.shape({
    sex: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    born: PropTypes.number.isRequired,
    died: PropTypes.number.isRequired,
    mother: PropTypes.string.isRequired,
    father: PropTypes.string.isRequired,
  }).isRequired,
  i: PropTypes.number.isRequired,
};

export default App;
