import React from 'react';
import './App.css';

import getData from './api/getData';
import PeopleTable from './components/PeopleTable';
import createSorterBy from './components/createSorterBy';

class App extends React.Component {
  state = {
    people: [],
    visiblePeople: [],
    sortField: 'id',
  }

  componentDidMount() {
    this.loadData();
  }

  loadData = async() => {
    const people = await getData();

    this.setState({
      people,
      visiblePeople: people,
    });
  };

  sortBy = (sortField) => {
    this.setState({
      sortField,
    });
    this.setState(prevState => ({
      visiblePeople: createSorterBy(prevState),
    }));
  };

  filterByName = (event) => {
    const { value } = event.target;

    this.setState(prevState => ({
      visiblePeople: prevState.people.filter(
        person => person.name.toLowerCase().includes(value.toLowerCase())
      ),
    }));
  };

  filterByMother = (event) => {
    const { value } = event.target;

    this.setState(prevState => ({
      visiblePeople: prevState.people.filter(
        (person) => {
          if (person.mother !== null) {
            return person.mother.toLowerCase().includes(value.toLowerCase());
          }

          return 0;
        }
      ),
    }));
  }

  filterByFather = (event) => {
    const { value } = event.target;

    this.setState(prevState => ({
      visiblePeople: prevState.people.filter(
        (person) => {
          if (person.father !== null) {
            return person.father.toLowerCase().includes(value.toLowerCase());
          }

          return 0;
        }
      ),
    }));
  }

  render() {
    const { visiblePeople } = this.state;

    return (
      <div className="App">
        <h1>People table</h1>

        <div className="sort-buttons">
          <h2>
            Sort by:
          </h2>

          <button
            type="button"
            onClick={() => this.sortBy('id')}
            className="sort-buttons__btn"
          >
            ID
          </button>

          <button
            type="button"
            onClick={() => this.sortBy('name')}
            className="sort-buttons__btn"
          >
            Name
          </button>

          <button
            type="button"
            onClick={() => this.sortBy('age')}
            className="sort-buttons__btn"
          >
            Age
          </button>

          <button
            type="button"
            onClick={() => this.sortBy('born')}
            className="sort-buttons__btn"
          >
            Year of birth
          </button>

          <button
            type="button"
            onClick={() => this.sortBy('died')}
            className="sort-buttons__btn"
          >
            Year of death
          </button>
        </div>

        <div className="filter-inputs">
          <label htmlFor="name-input">
            Filter by name:
            <input
              type="text"
              id="name-input"
              onChange={this.filterByName}
            />
          </label>
          <label htmlFor="mother-input">
            Filter by mother:
            <input
              type="text"
              id="mother-input"
              onChange={this.filterByMother}
            />
          </label>
          <label htmlFor="father-input">
            Filter by father:
            <input
              type="text"
              id="father-input"
              onChange={this.filterByFather}
            />
          </label>
        </div>

        <PeopleTable people={visiblePeople} />
      </div>
    );
  }
}

export default App;
