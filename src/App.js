import React from 'react';
import peopleFromServer from './people';
import PeopleTable from './PeopleTable';
import PeopleFilter from './PeopleFilter';
import './App.css';

const preparedPeople = peopleFromServer.map(
  (person, index) => (
    {
      ...person,
      id: index + 1,
      age: person.died - person.born,
      century: Math.ceil(person.died / 100),
    }
  )
);

class App extends React.Component {
  state = {
    people: [...preparedPeople],
    filter: '',
  }

  filterPeople = (input) => {
    this.setState({ filter: input.toLowerCase() });
  }

  sortByNameAZ = (event) => {
    event.preventDefault();

    this.setState(prevState => ({
      people: prevState.people
        .sort((a, b) => a.name.localeCompare(b.name)),
    }));
  }

  sortByNameZA = (event) => {
    event.preventDefault();

    this.setState(prevState => ({
      people: prevState.people
        .sort((a, b) => b.name.localeCompare(a.name)),
    }));
  }

  render() {
    const { people, filter } = this.state;

    const visiblePeople = people
      .filter(person => person.name.toLowerCase().includes(filter)
        || (person.mother && person.mother.toLowerCase().includes(filter))
        || (person.father && person.father.toLowerCase().includes(filter)));

    return (
      <div className="App">
        <h1>People table</h1>
        <PeopleFilter filterPeople={this.filterPeople} />
        <h4>
          {visiblePeople.length}
          {' '}
          people found
        </h4>
        <PeopleTable
          people={visiblePeople}
          sortByNameAZ={this.sortByNameAZ}
          sortByNameZA={this.sortByNameZA}
        />
      </div>
    );
  }
}

export default App;
