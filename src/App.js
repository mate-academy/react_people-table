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

const getSortedPeople = (people, sortField, query) => {
  const normalizedQuery = query.toLowerCase();
  return people
    .filter(
      person => (person.name.toLowerCase().includes(normalizedQuery))
    )
    .sort((a, b) => {
      switch (typeof a[sortField]) {
        case 'string':
          return a[sortField].localeCompare(b[sortField]);

        case 'number':
        case 'boolean':
          return a[sortField] - b[sortField];

        default:
          return 0;
      }
    });
};

class App extends React.Component {
  people = [];
  state = {
    visiblePeople: [],
    sortField: '',
    query: '',
  };

  async componentDidMount() {
    this.people = await getPeopleFromServer();

    this.setState({ visiblePeople: this.people });
  }

  setSortField = (sortField) => {
    this.setState(({ query }) => ({
      sortField,
      visiblePeople: getSortedPeople(this.people, sortField, query),
    }));
  };

  handleQueryChange = (event) => {
    const query = event.target.value;
    this.setState(({ sortField }) => ({
      query,
      visiblePeople: getSortedPeople(this.people, sortField, query),
    }));
  };

  render() {
    const { visiblePeople, sortField, query } = this.state;

    return (
      <div className="App">
        <h1>
          {visiblePeople.length}
          {' '}
          people sorted by
          {' '}
          {sortField}
        </h1>

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

export default App;
