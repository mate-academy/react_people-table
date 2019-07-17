import React from 'react';
import PeopleTable from './components/PeopleTable';
import getPeople from './api/getPeople';
import './App.css';

const getSortedPeople = (people, sortField) => {
  const callback = (typeof people[0][sortField] === 'string')
    ? (personA, personB) => personA[sortField].localeCompare(personB[sortField])
    : (personA, personB) => personA[sortField] - personB[sortField];

  return [...people].sort(callback);
};

class App extends React.Component {
  state = {
    people: [],
    visiblePeople: [],
    sortField: 'id',
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
    this.setState({
      visiblePeople: getSortedPeople(this.state.people, sortField),
      sortField,
    });
  };

  render() {
    const { people, visiblePeople } = this.state;
    return (
      <div className="App">
        <h1>
          {`${people.length}`}
          {' '}
          people sorted by
          {' '}
          {this.state.sortField}
        </h1>

        <button type="button" onClick={() => this.sortBy('id')}>
          Sort by ID
        </button>

        <button type="button" onClick={() => this.sortBy('name')}>
          Sort by name
        </button>

        <button type="button" onClick={() => this.sortBy('age')}>
          Sort by age
        </button>

        <button type="button" onClick={() => this.sortBy('born')}>
          Sort by year of birth
        </button>

        <button type="button" onClick={() => this.sortBy('died')}>
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
