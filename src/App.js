import React from 'react';
import './App.css';
import PeopleTable from './PeopleTable';

const getFromServerPeople = async() => {
  const Api = 'https://mate-academy.github.io/react_people-table/api/';
  return fetch(`${Api}/people.json`).then(respose => respose.json());
};

const sortBy = (people, sortField) => {
  const sortPeople = {
    name: (personA, personB) => personA.name.localeCompare(personB.name),
    age: (personA, personB) => personA.age - personB.age,
    born: (personA, personB) => personA.born - personB.born,
    died: (personA, personB) => personA.died - personB.died,
    id: (personA, personB) => personA.id - personB.id,
  };
  const callback = sortPeople[sortField];

  return [...people].sort(callback);
};

class App extends React.Component {
  state = {
    people: [],
    sortField: 'name',
    visualPeople: [],
  }

  async componentDidMount() {
    const people = await getFromServerPeople();
    const getPeople = [...people].map((person, index) => ({
      ...person,
      id: index + 1,
      age: person.died - person.born,
      century: Math.ceil(person.died / 100),
      children: [...people]
        .filter(kidd => kidd.father === person.name
    || kidd.mother === person.name)
        .map(kidd => kidd.name),
    }));

    this.setState(prev => ({
      people: [...getPeople],
      visualPeople: sortBy(getPeople, prev.sortField),
    }));
  }

  handleText = (someTyp) => {
    const { value } = someTyp.target;

    this.setState(prevState => ({
      people: prevState.visualPeople.filter(
        person => [person.mother, person.name, person.mother]
          .join('').toLowerCase().includes(value.toLowerCase())
      ),
    }));
  }

  handleSortReverse = () => {
    this.setState(prevState => ({
      people: sortBy(prevState.people).reverse(),
    }));
  }

  handleSort = (sortField) => {
    const { sortField: field } = this.state;

    sortField !== field
      ? this.setState(prevState => ({
        people: sortBy(prevState.people, sortField),
        sortField,
      }))
      : this.handleSortReverse();
  }

  render() {
    const { people } = this.state;

    return (
      <div className="App">
        <h1>
        People table
          { people.length }
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
          onClick={() => this.handleSort('id')}
        >
            Sort id
        </button>
        <button
          type="button"
          onClick={() => this.handleSort('name')}
        >
            Sort name
        </button>
        <button
          type="button"
          onClick={() => this.handleSort('age')}
        >
            Sort age
        </button>
        <button
          type="button"
          onClick={() => this.handleSort('born')}
        >
            Sort born
        </button>
        <button
          type="button"
          onClick={() => this.handleSort('died')}
        >
            Sort died
        </button>
        <PeopleTable people={people} />
      </div>
    );
  }
}

export default App;
