import React from 'react';
import PeopleTable from './PeopleTable';
import NewPerson from './NewPerson';
import getPeople from './api';
import './App.css';

class App extends React.Component {
  state = {
    people: [],
    visiblePeople: [],
    value: '',
    shownForm: false,
  };

  componentDidMount = async() => {
    const people = await getPeople();
    this.setState({
      people,
      visiblePeople: people,
    });
  };

  filterBy = (event) => {
    const value = event.target.value.toLowerCase();

    this.setState((prevState) => {
      const visiblePeople = prevState.people.filter(person => (
        person.name.toLowerCase().includes(value)
        || (person.father && person.father.toLowerCase().includes(value))
        || (person.mother && person.mother.toLowerCase().includes(value))
      ));
      return {
        visiblePeople,
      };
    });
    this.setState({
      value: event.target.value,
    });
  };

  sortBy = (value) => {
    if (value === 'name') {
      this.setState(prevState => ({
        visiblePeople: prevState.visiblePeople.sort((a, b) => (
          a[value].localeCompare(b[value])
        )),
      }));
    } else {
      this.setState(prevState => ({
        visiblePeople: prevState.visiblePeople.sort((a, b) => (
          a[value] - b[value]
        )),
      }));
    }
  };

  showForm = () => {
    this.setState({
      shownForm: true,
    });
  };

  closeForm = (event) => {
    event.preventDefault();
    this.setState({
      shownForm: false,
    });
  };

  addNewPerson = (newPerson) => {
    newPerson = {
      ...newPerson,
      age: newPerson.died - newPerson.born,
      century: Math.ceil(newPerson.died / 100),
      id: this.state.visiblePeople.length + 1,
    };
    this.setState(prevState => ({
      visiblePeople: [...prevState.visiblePeople, newPerson],
      people: [...prevState.visiblePeople, newPerson],
      shownForm: false,
    }));
  }

  render() {
    const {
      shownForm,
      people,
      value,
      visiblePeople,
      markedAPersonRow,
    } = this.state;

    return (
      <div className="App">
        <button
          type="submit"
          className="btn-new-person"
          onClick={this.showForm}
        >
          Add a new person
        </button>
        {shownForm
        && (
          <NewPerson
            onSubmit={this.addNewPerson}
            closeForm={this.closeForm}
          />
        )}
        <h1>
          People table&nbsp;
          (
          {people.length}
          &nbsp;people)
        </h1>
        <label
          htmlFor="filter"
          className="person--filter"
        >
          Filter by&nbsp;
          <input
            id="filter"
            type="text"
            placeholder="enter text"
            value={value}
            onChange={this.filterBy}
          />
        </label>
        <div className="button-list">
          <button
            type="submit"
            className="button-sort"
            onClick={() => this.sortBy('id')}
          >
            Sort by ID
          </button>
          <button
            type="submit"
            className="button-sort"
            onClick={() => this.sortBy('name')}
          >
            Sort by NAME
          </button>
          <button
            type="submit"
            className="button-sort"
            onClick={() => this.sortBy('born')}
          >
            Sort by BORN
          </button>
          <button
            type="submit"
            className="button-sort"
            onClick={() => this.sortBy('died')}
          >
            Sort by DIED
          </button>
          <button
            type="submit"
            className="button-sort"
            onClick={() => this.sortBy('age')}
          >
            Sort by AGE
          </button>
        </div>
        <PeopleTable
          people={visiblePeople}
          markedAPersonRow={markedAPersonRow}
        />
      </div>
    );
  }
}

export default App;
