import React from 'react';
import peopleFromServer from './people';
import PeopleFilter from './PeopleFilter';
import PeopleTable from './PeopleTable';
import { debounce } from './debounce';
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
    isSortedBy: 'id',
  }

  filterPeople = debounce((input) => {
    this.setState({ filter: input.trim().toLowerCase() });
  }, 500);

  sortPeopleBy = (sortBy) => {
    if (sortBy === this.state.isSortedBy) {
      this.setState(prevState => ({ people: prevState.people.reverse() }));
    } else {
      switch (typeof this.state.people[0][sortBy]) {
        case 'string':
          this.setState(prevState => ({
            people: prevState.people
              .sort((a, b) => a[sortBy].localeCompare(b[sortBy])),
          }));
          break;
        default:
          this.setState(prevState => ({
            people: prevState.people
              .sort((a, b) => a[sortBy] - b[sortBy]),
          }));
      }
    }

    this.setState({ isSortedBy: sortBy });
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
          sortPeopleBy={this.sortPeopleBy}
        />
      </div>
    );
  }
}

export default App;
