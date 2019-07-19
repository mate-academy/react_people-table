import React from 'react';
import './App.css';
import getPeople from './api/getPeople';
import PeopleTable from './PeopleTable';

const getSortedPeople = (people, sortField, query) => {
  const normalizedQuery = query.toLowerCase();

  const getPeopleByFilter = (people) => (
    people.filter((person) => {
      return [person.name, person.motherName, person.fatherName]
        .join(', ')
        .toLowerCase().includes(normalizedQuery);
    })
  );

  return getPeopleByFilter(people, query)
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
    this.people = await getPeople();

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
