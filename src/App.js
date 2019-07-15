import React from 'react';
import PeopleTable from './PeopleTable';
import NewPerson from './NewPerson';
import { getPeople } from './api';
import './App.css';

class App extends React.Component {
  state = {
    people: [],
    visiblePeople: [],
    value: '',
    markedAPersonRow: null,
    showFormAddNewPerson: false,
  };

  componentDidMount = async() => {
    const people = await getPeople();
    const allPeopleData = people.map((person, i = 1) => ({
      ...person,
      age: person.died - person.born,
      century: Math.ceil(person.died / 100),
      id: i + 1,
      mother: person.mother || 'no',
      father: person.father || 'no',
      fatherData: people.filter(man => (
        person.father === man.name
      )),
      motherData: people.filter(woman => (
        person.mother === woman.name
      )),
      children: people.filter(child => (
        person.name === child.mother || person.name === child.father
      )).map(child => (`${child.name}, `
      )).join('')
        .replace(/,\s*$/, ''),
    }));

    this.setState({
      people: allPeopleData,
      visiblePeople: allPeopleData,
    });
  };

  filterBy = (event) => {
    const value = event.target.value.toLowerCase();
    const visiblePeople = this.state.people.filter(person => (
      person.name.toLowerCase().includes(value)
      || person.father.toLowerCase().includes(value)
      || person.mother.toLowerCase().includes(value)
    ));

    this.setState({
      value: event.target.value,
      visiblePeople,
    });
  };

  sortBy = (value) => {
    if (value === 'name') {
      this.setState(prevState => ({
        visiblePeople: prevState.visiblePeople.sort((a, b) => a[value].localeCompare(b[value])),
      }));
    } else {
      this.setState(prevState => ({
        visiblePeople: prevState.visiblePeople.sort((a, b) => a[value] - b[value]),
      }));
    }
  }

  markByClick = (value) => {
    this.setState({
      markedAPersonRow: value,
    });
  }

  showForm = () => {
    this.setState({
      showFormAddNewPerson: true,
    });
  }

  closeForm = (event) => {
    event.preventDefault();
    this.setState({
      showFormAddNewPerson: false,
    });
  }

  render() {
    const {
      showFormAddNewPerson,
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
          Add new person
        </button>
        {showFormAddNewPerson
        && (
          <NewPerson
            showFormAddNewPerson={showFormAddNewPerson}
            addNewPerson={this.addNewPerson}
            closeForm={this.closeForm}
          />
        )}
        <h1>
          People table&nbsp;
          (
          {people.length}
          &nbsp;people)
        </h1>
        <label className="person--filter">
          Filter by&nbsp;
          <input
            type="text"
            placeholder="enter text"
            value={value}
            onInput={this.filterBy}
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
          markByClick={this.markByClick}
        />
      </div>
    );
  }
}

export default App;
