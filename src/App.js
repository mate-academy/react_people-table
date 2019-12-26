import React from 'react';
import './app.css';
import peopleList from './peopleList';
import PeopleTable from './PeopleTable';
import Filter from './Filter';

const changedPeople = peopleList
  .map((person, i) => ({
    ...person,
    id: i + 1,
    age: person.died - person.born,
    century: Math.ceil(person.died / 100),
  }));

class App extends React.Component {
  state = {
    people: [...changedPeople],
    filtered: [],
    sortColumn: 'id',
  };

  toFilter = (value) => {
    this.setState(prev => ({
      filtered: prev.people.filter(person => person.name.toLowerCase()
        .includes(value.toLowerCase())
        || (person.mother !== null
          && person.mother.toLowerCase().includes(value.toLowerCase()))
        || (person.father !== null
          && person.father.toLowerCase().includes(value.toLowerCase()))),
    }));
  }

  sortingArr = (arr, col) => arr.sort((a, b) => (typeof (a[col]) === 'string'
    ? a[col].localeCompare(b[col])
    : a[col] - b[col]))

  toSort = (title) => {
    this.state.filtered.length
      ? this.setState(prev => ({
        sortColumn: title,
        filtered: title !== prev.sortColumn
          ? this.sortingArr(prev.filtered, title)
          : prev.filtered.reverse(),
      }))
      : this.setState(prev => ({
        sortColumn: title,
        people: title !== prev.sortColumn
          ? this.sortingArr(prev.people, title)
          : prev.people.reverse(),
      }));
  }

  render() {
    const { people, filtered } = this.state;

    return (
      <div className="App">
        <h1>
          People table
          {people.length}
        </h1>
        <Filter toFilter={this.toFilter} />
        <PeopleTable
          people={filtered.length ? filtered : people}
          toSort={this.toSort}
        />
      </div>
    );
  }
}

export default App;
