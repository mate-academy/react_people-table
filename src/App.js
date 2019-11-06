import React, { Component } from 'react';
import PeopleTable from './components/PeopleTable';
import './App.css';
import Sorting from './components/Sorting';
import getPeople from './api';

const peopleWithChildren = (people) => {
  const normlizedPeople = people.map((person, index) => ({
    ...person,
    id: index + 1,
    age: person.died - person.born,
    century: Math.ceil(person.died / 100),
    mother: person.mother,
    father: person.father,
  }));

  return people.map((person, index) => ({
    ...person,
    id: index + 1,
    age: person.died - person.born,
    century: Math.ceil(person.died / 100),
    mother: person.mother,
    father: person.father,
    children: normlizedPeople.filter(
      child => child.father === person.name || child.mother === person.name
    ),
  }));
};

const getFilteredPeople = (people, query) => {
  let normalizedQuery = '';

  if (query) {
    normalizedQuery = query.toLowerCase();
  }

  return people.filter(
    (person) => {
      let father = '';
      let mother = '';

      if (person.father) {
        // eslint-disable-next-line
        father = person.father;
      }

      if (person.mother) {
        // eslint-disable-next-line
        mother = person.mother;
      }

      return person.name.toLowerCase().includes(normalizedQuery)
        || father.toLowerCase().includes(normalizedQuery)
        || mother.toLowerCase().includes(normalizedQuery);
    }
  );
};

const getSortedPeople = (
  people, sortField, direction
) => people.sort((firstPerson, secondPerson) => {
  switch (typeof firstPerson[sortField]) {
    case 'string':
      return firstPerson[sortField].localeCompare(
        secondPerson[sortField]
      ) * direction;
    case 'number':
    case 'boolean':
      return direction > 0
        ? firstPerson[sortField] - secondPerson[sortField]
        : secondPerson[sortField] - firstPerson[sortField];
    default:
      return 0;
  }
});

class App extends Component {
  state = {
    // eslint-disable-next-line
    people: [],
    visiblePeople: [],
    // eslint-disable-next-line
    direction: 1,
  };

  async componentDidMount() {
    const people = await getPeople();
    const normalizedPeople = peopleWithChildren(people);

    this.setState({
      // eslint-disable-next-line
      people: normalizedPeople,
      visiblePeople: normalizedPeople,
    });
  }

  handleInputChange = (event) => {
    const query = event.target.value;

    this.setState(({ people }) => ({
      visiblePeople: getFilteredPeople(people, query),
    }));
  };

  setSort = (sortField) => {
    this.setState(({ visiblePeople, direction }) => ({
      visiblePeople: getSortedPeople(visiblePeople, sortField, direction),
      // eslint-disable-next-line
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
        <Sorting handleSort={this.setSort} />
        <PeopleTable
          people={visiblePeople}
          handleSort={this.setSort}
        />
      </div>
    );
  }
}

export default App;
