import React from 'react';
import PropTypes from 'prop-types';
import loadPeople from './api/API_DATA';
import CreatePerson from './components/CreatePerson';
import PeopleTable from './components/PeopleTable';
import './api/style.css';

class App extends React.Component {
  state = {
    people: [],
    visiblePeople: [],
    isLoaded: false,
    isLoading: false,
    direction: 1,
    search: '',
  }

  LoadData = async() => {
    this.setState({
      isLoading: true,
    });

    const peopleData = await loadPeople();

    const getPeople = peopleData.map((person, index) => ({
      ...person,
      id: index + 1,
      age: person.died - person.born,
      century: Math.ceil(person.died / 100),
      children: peopleData
        .filter(child => child.father === person.name
            || child.mother === person.name)
        .map(personn => personn.name),
    }));

    this.setState({
      people: getPeople,
      visiblePeople: getPeople,
      isLoaded: true,
      isLoading: false,
    });
  }

  getSortBy = field => (a, b) => {
    const { direction } = this.state;

    switch (typeof a[field]) {
      case 'string':
        return direction * a[field].localeCompare(b[field]);

      case 'number':
      case 'boolean':
        return direction * a[field] - b[field];

      default:
        return 0;
    }
  };

  handleClickSortById = () => {
    this.setState(prevState => ({
      direction: prevState.direction === 1 ? -1 : 1,
      visiblePeople: [...prevState.people].sort(this.getSortBy('id')),
    }));
  }

  handleClickSortByName = () => {
    this.setState(prevState => ({
      direction: prevState.direction === 1 ? -1 : 1,
      visiblePeople: [...prevState.people].sort(this.getSortBy('name')),
    }));
  }

  handleClickSortByBorn = () => {
    this.setState(prevState => ({
      direction: prevState.direction === 1 ? -1 : 1,
      visiblePeople: [...prevState.people].sort(this.getSortBy('born')),
    }));
  }

  handleClickSortByDied = () => {
    this.setState(prevState => ({
      direction: prevState.direction === 1 ? -1 : 1,
      visiblePeople: [...prevState.people].sort(this.getSortBy('died')),
    }));
  }

  handleClickSortByAge = () => {
    this.setState(prevState => ({
      direction: prevState.direction === 1 ? -1 : 1,
      visiblePeople: [...prevState.people].sort(this.getSortBy('age')),
    }));
  }

  updateSearch = (event) => {
    this.setState({
      search: event.target.value.slice(0),
    });
  }

  addPerson = (person) => {
    this.setState((prevState) => {
      const copiedPeople = [...prevState.visiblePeople, person];

      return {
        visiblePeople: copiedPeople,
      };
    });
  }

  render() {
    const filtredSheet = this.state.visiblePeople.filter(person => (
      [person.name, person.mother, person.father]
        .join('')
        .toLowerCase()
        .includes(this.state.search.toLowerCase())
    ));

    if (this.state.isLoaded) {
      return (
        <div>
          <CreatePerson
            onSubmit={this.addPerson}
            people={filtredSheet}
          />

          <SearchField
            search={this.state.search}
            updateSearch={this.updateSearch}
          />
          <PeopleTable
            people={filtredSheet}
            handleClickSortByName={this.handleClickSortByName}
            handleClickSortById={this.handleClickSortById}
            handleClickSortByBorn={this.handleClickSortByBorn}
            handleClickSortByDied={this.handleClickSortByDied}
            handleClickSortByAge={this.handleClickSortByAge}
          />
        </div>
      );
    }

    return (
      <div>
        <div className="button_load">
          <button
            className="button"
            onClick={this.LoadData}
            type="button"
            disabled={this.state.isLoading}
          >
            {' '}
            {this.state.isLoading ? 'Loading...' : 'Load'}
          </button>
        </div>
      </div>
    );
  }
}

const SearchField = ({ search, updateSearch }) => (
  <div className="search_list">
    <input
      className="search_field"
      type="text"
      value={search}
      onChange={updateSearch}
      placeholder="Search"
    />
  </div>
);

export default App;
