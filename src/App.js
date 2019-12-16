import React from 'react';
import peopleFromServer from './api/people';
import PeopleTable from './PeopleTable';
import './app.scss';

const people = peopleFromServer
  .map((person, i) => ({
    id: i + 1,
    ...person,
    age: person.died - person.born,
    century: Math.ceil(person.died / 100),
  }));

class App extends React.Component {
  state = {
    inputValue: '',
    peopleList: [...people],
  };

  inputHandler = event => (
    this.setState({ inputValue: event.target.value.replace(/^\s+/, '') })
  );

  sortHandler = field => (
    this.setState((prevState) => {
      if (prevState.sortField === field) {
        return {
          sortField: field,
          peopleList: [...prevState.peopleList].reverse(),
        };
      }

      return {
        sortField: field,
        peopleList: [...prevState.peopleList]
          .sort((person1, person2) => {
            if (person1[field] === null) {
              return 1;
            }

            if (person2[field] === null) {
              return -1;
            }

            return (
              typeof person1[field] === 'string'
                ? person1[field].localeCompare(person2[field])
                : person1[field] - person2[field]
            );
          }),
      };
    })
  );

  render() {
    const { inputValue, peopleList } = this.state;

    const visiblePeople = peopleList
      .filter(({ mother, father, name }) => {
        const mom = (mother || '').toLowerCase();
        const dad = (father || '').toLowerCase();
        const personName = name.toLowerCase();
        const input = inputValue.toLowerCase();

        return mom.includes(input)
          || dad.includes(input)
          || personName.includes(input);
      });

    return (
      <div className="App">
        <input
          type="text"
          className="search-bar"
          placeholder="Search by name"
          onChange={this.inputHandler}
          value={inputValue}
        />
        <PeopleTable
          people={visiblePeople}
          highlight={inputValue}
          sortHandler={this.sortHandler}
        />
      </div>
    );
  }
}

export default App;
