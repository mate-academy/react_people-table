import React from 'react';
import './App.css';
import PeopleTable from './PeopleTable';

const getPeople = async() => {
  const Api = 'https://mate-academy.github.io/react_people-table/api/';
  return fetch(`${Api}/people.json`).then(respose => respose.json());
};

class App extends React.Component {
  state = {
    people: [],
    visualPeople: [],
    sortField: 'name',
  }

  async componentDidMount() {
    const people = await getPeople();
    const peopleWithAge = people.map(person => ({
      ...person,
      age: person.died - person.born,
      century: Math.ceil(person.died / 100),
      children: people
        .filter(kidd => kidd.father === person.name
          || kidd.mother === person.name)
        .map(child => child.name),
    }));

    this.setState({
      visualPeople: [...peopleWithAge],
      people: [...peopleWithAge],
    });
  }

  handleSortByName = () => {
    if (this.state.sortField === 'name') {
      this.setState(prev => ({
        sortField: 'name',
        people: prev.visualPeople.reverse(),
      }));
    } else {
      this.setState(prev => ({
        sortField: 'name',
        people: prev.visualPeople.sort(
          (a, b) => a.name.localeCompare(b.name),
        ),
      }));
    }
  }

  handleText = (someTyp) => {
    const search = someTyp.target.value;
    this.setState(prev => ({
      people: prev.visualPeople.filter(
        pers => [pers.name, pers.mother, pers.father]
          .join('').toLowerCase().includes(search.toLowerCase())
      ),
    }));
  };

  render() {
    return (
      <div className="App">
        <h1>
        People table
          { this.state.people.length }
        </h1>
        <label htmlFor="name__input">
            Filter by name:
          <input
            type="text"
            id="name__input"
            onChange={this.handleText}
          />
        </label>
        <button
          type="button"
          onClick={this.handleSortByName}
        >
          sort by name
        </button>
        <PeopleTable peoples={this.state.people} />
      </div>
    );
  }
}

export default App;
