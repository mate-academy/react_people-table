import React, { Component } from 'react';

import './App.scss';

import peopleFromServer from './people';
import PeopleTable from './components/PeopleTable';

const addPeopleFields = peopleArr => (
  peopleArr.map(
    (person, index) => ({
      id: index + 1,
      ...person,
      mother: !person.mother ? '' : person.mother,
      father: !person.father ? '' : person.father,
      age: person.died - person.born,
      century: Math.ceil(person.died / 100),
    })
  )
);

const peopleList = addPeopleFields(peopleFromServer);

class App extends Component {
  state = {
    people: [...peopleList],
  }

  searchPeople = (event) => {
    const value = event.target.value.trim().toLowerCase();
    let timer;

    clearTimeout(timer);

    timer = setTimeout(() => this.setState({
      people: peopleList.filter(
        ({ name, mother, father }) => (name + mother + father)
          .toLowerCase()
          .includes(value)
      ),
    }), 500);
  };

  sortTable = (event) => {
    const field = event.target.value;
    let callback;

    switch (typeof peopleList[0][field]) {
      case 'string':
        callback = (a, b) => a[field].localeCompare(b[field]);
        break;
      default:
        callback = (a, b) => a[field] - b[field];
    }

    this.setState((prevState) => {
      if (!prevState.isSorted) {
        return {
          people: [...prevState.people].sort(callback),
          isSorted: true,
        };
      }

      return {
        people: prevState.people.reverse(),
        isSorted: false,
      };
    });
  };

  render = () => {
    const { people } = this.state;

    return (
      <div className="App">
        <h1 className="main-title">People table</h1>
        <p className="table-info">
          {`Number of people: ${people.length}`}
        </p>

        <input
          type="search"
          className="table-search"
          placeholder="Search for people"
          onChange={this.searchPeople}
        />

        <PeopleTable
          people={people}
          sortTable={this.sortTable}
        />
      </div>
    );
  }
}

export default App;
