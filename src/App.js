import React, { Component } from 'react';
import PeopleTable from './components/PeopleTable';

import './style.scss';

const getPeople = async() => {
  const url
    = 'https://mate-academy.github.io/react_people-table/api/people.json';
  const response = await fetch(url);
  const people = await response.json();

  return people;
};

const peopleWithChildren = (people) => {
  const normlizedPeople = people.map((man, index) => ({
    ...man,
    id: index + 1,
    age: man.died - man.born,
    century: Math.ceil(man.died / 100),
    mother: man.mother,
    father: man.father,
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

  const filteredPeople = people.filter(
    (man) => {
      let father = '';
      let mother = '';

      if (man.father) {
        father = man.father;
      }

      if (man.mother) {
        mother = man.mother;
      }

      return man.name.toLowerCase().includes(normalizedQuery)
      || father.toLowerCase().includes(normalizedQuery)
      || mother.toLowerCase().includes(normalizedQuery);
    }
  );

  return filteredPeople;
};

const getSortedPeople = (people, sortField, direction) => {
  return people.sort((manA, manB) => {
    switch (typeof manA[sortField]) {
      case 'string':
        return manA[sortField].localeCompare(manB[sortField]) * direction;
      case 'number':
      case 'boolean':
        return direction > 0
          ? manA[sortField] - manB[sortField]
          : manB[sortField] - manA[sortField];
      default:
        return 0;
    }
  });
}

class App extends Component {
  state = {
    people: [],
    visiblePeople: [],
    sortField: '',
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
    const query = event.target.value;

    this.setState(({ people }) => ({
      query,
      visiblePeople: getFilteredPeople(people, query),
    }));
  }

  setSort = (sortField) => {
    this.setState(({ visiblePeople, direction }) => ({
      sortField,
      visiblePeople: getSortedPeople(visiblePeople, sortField, direction),
      direction: direction === 1 ? -1 : 1,
    }));
  }

  render() {
    const { visiblePeople, sortField } = this.state;

    return (
      <div className="App">
        <h1>
          Is sorted by

          {' '}

          {sortField}
        </h1>
        <input
          onChange={this.handleInputChange}
          className="input-filter_name"
          type="text"
          placeholder="Enter the name of the person, her mother or father"
        />
        <PeopleTable
          people={visiblePeople}
          handleSort={this.setSort}
        />
      </div>
    );
  }
}

export default App;
