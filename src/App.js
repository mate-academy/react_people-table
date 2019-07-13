import React from 'react';
import './App.css';

import getData from './api/getData';
import PeopleTable from './components/PeopleTable';

const getPeopleByFilter = (people, searchText) => (
  [...people].filter((person) => {
    if (person.name !== null
        && person.mother !== null
        && person.father !== null) {
      return (person.name
        .toLowerCase()
        .includes(searchText.toLowerCase())
      || person.mother
        .toLowerCase()
        .includes(searchText.toLowerCase())
      || person.father
        .toLowerCase()
        .includes(searchText.toLowerCase()));
    }

    return 0;
  }));

class App extends React.Component {
  state = {
    people: [],
    shownPeople: [],
    direction: 'asc',
  };

  async componentDidMount() {
    const peopleFromApi = await getData();

    this.setState({
      people: [...peopleFromApi],
      shownPeople: [...peopleFromApi],
    });
  }

  handleSearch = (event) => {
    const { value } = event.target;

    this.setState(prevState => ({
      shownPeople: getPeopleByFilter(prevState.people, value),
    }));
  };

  handleSortBy = (key) => {
    this.setState(prevState => ({
      shownPeople: prevState.people.sort((a, b) => {
        if (typeof a[key] === 'string' && prevState.direction === 'asc') {
          return a[key].localeCompare(b[key]);
        }

        if (typeof a[key] === 'number' && prevState.direction === 'asc') {
          return a[key] - b[key];
        }

        return b[key] - a[key];
      }),
      direction: prevState.direction === 'asc' ? 'desc' : 'asc',
    }));
  };

  render() {
    return (
      <main>
        <div className="App">
          <h1>People table</h1>
          <span>People in table - </span>
          {this.state.people.length}
        </div>

        <PeopleTable
          people={this.state.shownPeople}
          handleSearch={this.handleSearch}
          handleSortBy={this.handleSortBy}
        />

      </main>
    );
  }
}

export default App;
