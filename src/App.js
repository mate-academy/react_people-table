import React from 'react';
import './App.css';

import getData from './api/getData';
import PeopleTable from './components/PeopleTable';

const getPeopleByFilter = (people, searchText) => (
  people.filter((person) => {
    if (person.name !== null
      && person.motherName !== null
      && person.fatherName !== null) {
      return (person.name
        .toLowerCase()
        .includes(searchText.toLowerCase())
    || person.motherName
      .toLowerCase()
      .includes(searchText.toLowerCase())
    || person.fatherName
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

        if (typeof a[key] === 'string' && prevState.direction === 'desc') {
          return b[key].localeCompare(a[key]);
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
    const { shownPeople } = this.state;

    return (
      <main>
        <div className="App">
          <h1>People table</h1>
          <span>People in table - </span>
          {shownPeople.length}
        </div>

        <div className="search">
          <input
            type="search"
            placeholder="Input name for searching"
            className="search__input"
            autoComplete="off"
            onChange={this.handleSearch}
          />
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
