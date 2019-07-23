import React from 'react';
import PeopleTable from './components/PeopleTable';
import getPeople from './api/getPeople';
import './App.css';

const getSortedPeople = (people, sortField, query = '') => {
  const callback = (typeof people[0][sortField] === 'string')
    ? (personA, personB) => personA[sortField].localeCompare(personB[sortField])
    : (personA, personB) => personA[sortField] - personB[sortField];

  return people
    .filter(person => (person.name + person.mother + person.father)
      .toLowerCase()
      .includes(query.toLowerCase()))
    .sort(callback);
};

class App extends React.Component {
  state = {
    people: [],
    visiblePeople: [],
    sortField: 'id',
    query: '',
  };

  async componentDidMount() {
    this.loadData();
  }

  loadData = async() => {
    const people = await getPeople();
    this.setState({
      people,
      visiblePeople: getSortedPeople(people, 'id'),
    });
  };

  sortBy = (sortField) => {
    this.setState(state => ({
      visiblePeople: getSortedPeople(state.people, sortField, state.query),
      sortField,
    }));
  };

  handleQueryChange = (event) => {
    const { value } = event.target;
    this.setState(state => ({
      visiblePeople: getSortedPeople(state.people, state.sortField, value),
      query: value,
    }));
  };

  render() {
    const { people, visiblePeople, query } = this.state;
    return (
      <div className="App">
        <h1>
          {`${people.length}`}
          {' '}
          people sorted by
          {' '}
          {this.state.sortField}
        </h1>

        <input
          type="text"
          value={query}
          onChange={this.handleQueryChange}
        />

        <button
          type="button"
          onClick={() => this.sortBy('id')}
        >
          Sort by ID
        </button>

        <button
          type="button"
          onClick={() => this.sortBy('name')}
        >
          Sort by name
        </button>

        <button
          type="button"
          onClick={() => this.sortBy('age')}
        >
          Sort by age
        </button>

        <button
          type="button"
          onClick={() => this.sortBy('born')}
        >
          Sort by year of birth
        </button>

        <button
          type="button"
          onClick={() => this.sortBy('died')}
        >
          Sort by year of death
        </button>

        <PeopleTable
          people={visiblePeople}
        />
      </div>
    );
  }
}

export default App;
