/* eslint-disable no-param-reassign,react/no-unused-state */
import PropTypes from 'prop-types';
import React from 'react';
import PeopleTable from './PeopleTable';

import './PeopleTable.scss';

const getPeople = async() => {
  const url = 'api/people.json';
  const response = await fetch(url);
  const people = await response.json();

  return people;
};

const normalizePeople = people => people
  .map((person, index) => ({
    ...person,
    id: index + 1,
    age: person.died - person.born,
    cenrury: Math.ceil(person.died / 100),
    children: people
      .filter(
        child => child.mother === person.name
        || child.father === person.name
      ).map(child => child.name),
  }))
  .map((person, index, preparedPeople) => {
    person.mother = preparedPeople.find(
      woman => woman.name === person.motherName
    );

    person.father = preparedPeople.find(
      man => man.name === person.fatherName
    );

    person.children = preparedPeople.filter(
      child => child.mother === person.name
          || child.father === person.name
    );

    return person;
  });

const getSortedPeople = (people, sortField, query) => {
  const normalizedQuery = query.toLowerCase();

  return people
    .filter(person => person.name.toLowerCase().includes(normalizedQuery))
    .sort((personA, personB) => {
      const valueA = personA[sortField];
      const valueB = personB[sortField];

      switch (typeof valueA) {
        case 'string':
          return valueA.localCompare(valueB);

        case 'number':
        case 'boolean':
          return valueA - valueB;

        default:
          return 0;
      }
    });
};

class App extends React.Component {
  state = {
    people: [],
    visiblePeople: [],
    sortField: '',
    query: '',
  };

  async componentDidMount() {
    const people = await getPeople();
    const normalizedPeople = normalizePeople(people);

    this.setState({
      people: normalizedPeople,
      visiblePeople: normalizedPeople,
    });
  }

  setSortField = (sortField) => {
    this.setState(({ query, people }) => ({
      sortField,
      visiblePeople: getSortedPeople(people, sortField, query),
    }));
  };

  handleQueryChange = (event) => {
    const query = event.target.value;

    this.setState(({ people, sortField }) => ({
      query,
      visiblePeople: getSortedPeople(people, sortField, query),
    }));
  };

  addPerson = (person) => {
    this.setState(({ people, sortField, query }) => {
      const copiedPeople = [...people, person];
      const normalizedPeople = normalizePeople(copiedPeople);

      return {
        people: normalizedPeople,
        visiblePeople: getSortedPeople(normalizedPeople, sortField, query),
      };
    });
  };

  render() {
    const { visiblePeople, sortField, query } = this.state;

    return (
      <div className="App">
        <h1>
          {visiblePeople.length}
          {' people are sorted by '}
          {sortField}
        </h1>

        <PersonForm onSubmit={this.addPerson} />

        <input
          type="text"
          value={query}
          onChange={this.handleQueryChange}
        />

        <PeopleTable
          people={visiblePeople}
          onSortFieldChanged={this.setSortField}
        />
      </div>
    );
  }
}

class PersonForm extends React.Component {
  handleSubmit = (event) => {
    event.preventDefault();
    const form = event.target;

    this.props.onSubmit({
      name: form.elements.name.value,
      sex: form.elements.sex.value,
      mother: form.elements.mother.value,
      father: form.elements.father.value,
      born: +form.elements.born.value,
      died: +form.elements.died.value,
    });
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input type="text" name="name" />
        <input type="text" name="sex" />
        <input type="text" name="mother" />
        <input type="text" name="father" />
        <input type="text" name="born" />
        <input type="text" name="died" />
        <button type="submit">Add</button>
      </form>
    );
  }
}

PersonForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default App;
