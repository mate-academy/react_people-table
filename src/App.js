import React from 'react';
import { DebounceInput } from 'react-debounce-input';
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

  searchInTable = (e) => {
    const searchQuery = e.target.value.trim().toLowerCase();
    const result = this.people.filter(
      person => (person.name + person.mother + person.father).toLowerCase()
        .includes(searchQuery)
    );

    this.setState({
      people: result,
      peopleCount: result.length,
    });
  };

  sortFields = (field, type) => {
    this.setState((prevState) => {
      let peopleCopy = [...prevState.people];

      if (prevState.sortField === field) {
        return {
          people: peopleCopy.reverse(),
        };
      }

      switch (type) {
        case 'string':
          peopleCopy = peopleCopy
            .map(person => ({
              ...person,
              [field]: person[field] || '',
            }))
            .sort((a, b) => a[field].localeCompare(b[field]));

          return {
            people: peopleCopy,
            sortField: field,
          };

        case 'number':
          peopleCopy.sort((a, b) => a[field] - b[field]);

          return {
            people: peopleCopy,
            sortField: field,
          };

        default:
          peopleCopy.sort();

          return {
            people: peopleCopy,
            sortField: field,
          };
      }
    });
  };

  render() {
    return (
      <div className="App">
        <h1 className="title">
          People table
        </h1>
        <DebounceInput
          className="search"
          placeholder="Type to search..."
          type="search"
          debounceTimeout={500}
          onChange={this.searchInTable}
        />
        <section className="people">
          <PeopleTable
            people={this.state.people}
            sortFields={this.sortFields}
          />
          <div className="people__count">
            {`Rows in table: ${this.state.peopleCount}`}
          </div>
        </section>
      </div>
    );
  }
}

export default App;
