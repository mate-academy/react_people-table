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
        <PeopleTable people={this.state.people} />
      </div>
    );
  }
}

export default App;
