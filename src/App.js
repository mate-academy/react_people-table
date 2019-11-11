import React, { Component } from 'react';
import PeopleTable from './components/PeopleTable';
import './App.css';
import getPeople from './api';

const peopleWithChildren = people => people.map((person, index) => ({
  ...person,
  id: index + 1,
  age: person.died - person.born,
  century: Math.ceil(person.died / 100),
  mother: person.mother,
  father: person.father,
  children: people.filter(
    child => child.father === person.name || child.mother === person.name
  ),
}));

const getFilteredPeople = (people, query) => (
  people.filter(person => (
    person.name.toLowerCase().includes(query)
    || (person.mother || '').toLowerCase().includes(query)
    || (person.father || '').toLowerCase().includes(query)
  ))
);

const getSortedPeople = (
  people, sortField, direction
) => people.sort((firstPerson, secondPerson) => {
  switch (typeof firstPerson[sortField]) {
    case 'string':
      return firstPerson[sortField].localeCompare(
        secondPerson[sortField]
      ) * direction;
    case 'number':
      return direction > 0
        ? firstPerson[sortField] - secondPerson[sortField]
        : secondPerson[sortField] - firstPerson[sortField];
    default:
      return 0;
  }
});

class App extends Component {
  state = {
    people: [],
    visiblePeople: [],
    direction: 1,
  };

  async componentDidMount() {
    const people = await getPeople();
    const normalizedPeople = peopleWithChildren(people);

    this.setState({
      people: normalizedPeople,
      visiblePeople: normalizedPeople,
    });
  }

  handleInputChange = (event) => {
    const query = event.target.value.trim();

    this.setState(({ people }) => ({
      visiblePeople: getFilteredPeople(people, query),
    }));
  };

  setSort = (sortField) => {
    this.setState(({ visiblePeople, direction }) => ({
      visiblePeople: getSortedPeople(visiblePeople, sortField, direction),
      direction: direction === 1 ? -1 : 1,
    }));
  };

  render() {
    const { visiblePeople } = this.state;

    return (
      <div className="App">
        <div className="search__container">
          <input
            onChange={this.handleInputChange}
            className="search__input"
            type="text"
            placeholder="Enter the name..."
          />
        </div>
        <PeopleTable
          people={visiblePeople}
          handleSort={this.setSort}
        />
      </div>
    );
  }
}

export default App;
