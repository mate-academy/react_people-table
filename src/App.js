import React from 'react';
import People from './people';
import './App.scss';
import PeopleTable from './PeopleTable';

const peopleWithId = peopleList => peopleList.map(
  (person, i) => ({
    ...person,
    id: i,
    age: person.died - person.born,
    century: Math.ceil(person.died / 100),
  })
);

class App extends React.Component {
  people = peopleWithId(People);

  state = {
    people: this.people,
    peopleCount: this.people.length,
  };

  handleInputChange = (e) => {
    const searchQuery = e.target.value.trim().toLowerCase();
    const result = this.people.filter(
      person => (person.name + person.mother + person.father).toLowerCase()
        .includes(searchQuery)
    );

    this.setState({
      people: result,
      peopleCount: result.length,
      // eslint-disable-next-line react/no-unused-state
      sorted: false,
    });
  };

  sortFields = (field) => {
    this.setState((state) => {
      const peopleCopy = [...state.people];

      const newRows = {
        people: peopleCopy.sort((a, b) => {
          if (!a[field] && a[field] !== 0) {
            if (!b[field] && b[field] !== 0) {
              return -1;
            }

            return ''.localeCompare(b[field]);
          }

          if (!b[field] && b[field] !== 0) {
            return a[field].localeCompare('');
          }

          if (typeof a[field] === 'string') {
            return a[field].localeCompare(b[field]);
          }

          if (typeof a[field] === 'number') {
            return a[field] - b[field];
          }

          return a[field].toString() - b[field].toString();
        }),
        sorted: !state.sorted,
      };

      if (!state.sorted) {
        return newRows;
      }

      newRows.people.reverse();

      return newRows;
    });
  };

  render() {
    return (
      <div className="App">
        <h1>
          People table
          {' '}
          {this.state.peopleCount}
        </h1>
        <input
          type="search"
          onChange={this.handleInputChange}
        />
        <PeopleTable
          people={this.state.people}
          sortFields={this.sortFields}
        />
      </div>
    );
  }
}

export default App;
