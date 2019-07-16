import React, { Component } from 'react';
import PeopleTable from './components/PeopleTable';

import './style.scss';

const getPeople = async() => {
  const url
    = 'https://mate-academy.github.io/react_people-table/api/people.json';
  const response = await fetch(url);
  const people = await response.json();

  return people
    .map(person => ({ ...person }))
    .map((person, index, preparedPeople) => {
      /* eslint-disable no-param-reassign */
      person.id = index + 1;
      person.age = person.died - person.born;
      person.century = Math.ceil(person.died / 100);
      person.children = preparedPeople.filter(
        child => child.mother === person.name
          || child.father === person.name
      );
      /* eslint-enable no-param-reassign */

      return person;
    });
};

class App extends Component {
  people = [];

  state = {
    visiblePeople: [],
    sortField: '',
    direction: 1,
  };

  async componentDidMount() {
    this.people = await getPeople();

    this.setState({ visiblePeople: this.people });
  }

  setSort = (sortField) => {
    const sortedPeople = [...this.people].sort((a, b) => {
      switch (typeof a[sortField]) {
        case 'string':
          return a[sortField]
            .localeCompare(b[sortField]) * this.state.direction;
        case 'boolean':
        case 'number':
          return this.state.direction > 0
            ? a[sortField] - b[sortField]
            : b[sortField] - a[sortField];
        default:
          return 0;
      }
    });

    this.setState(state => ({
      visiblePeople: sortedPeople,
      sortField,
      direction: state.direction === 1 ? -1 : 1,
    }));
  };

  render() {
    const { visiblePeople, sortField } = this.state;

    return (
      <div className="App">
        <h1>
          Is sorted by
          {sortField}
        </h1>
        <PeopleTable
          people={visiblePeople}
          onSort={this.setSort}
        />
      </div>
    );
  }
}

export default App;
