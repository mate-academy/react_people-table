import React, { Component } from 'react';
import PeopleTable from './PeopleTable';
import './App.css';

const GetPeoples = async() => {
  const u = 'https://mate-academy.github.io/react_people-table/api/people.json';
  const response = await fetch(u);
  const people = await response.json();

  return people;
};

const sortedPeople = (people, targetField) => (
  people.sort((a, b) => {
    switch (typeof a[targetField]) {
      case 'string':
        return a[targetField].localeCompare(b[targetField]);

      case 'boolean':
      case 'number':
        return a[targetField] - b[targetField];

      default:
        return 0;
    }
  }));

class App extends Component {
  state = {
    people: [],
    visiblePeople: [],
    inputValue: '',
  }

  async componentWillMount() {
    const people = await GetPeoples();

    const peopleWithProps = people.map((person, index) => ({
      id: index + 1,
      ...person,
      age: person.died - person.born,
      century: Math.ceil(person.died / 100),
    }));

    this.setState({
      people: peopleWithProps,
      visiblePeople: peopleWithProps,
    });
  }

  checkPersonInfo = (info, inputText) => {
    if (info) {
      return info.toLowerCase().includes(inputText.toLowerCase());
    }

    return false;
  }

  filterPeople = (event) => {
    const inputText = event.target.value;

    this.setState(prevState => ({
      inputValue: inputText,
      visiblePeople: prevState.people.filter((person) => {
        const byName = this.checkPersonInfo(person.name, inputText);
        const byMother = this.checkPersonInfo(person.mother, inputText);
        const byFather = this.checkPersonInfo(person.father, inputText);

        return byName || byMother || byFather;
      }),
    }));
  }

  sortPeople = (targetField) => {
    this.setState({
      visiblePeople: sortedPeople([...this.people], targetField),
    });
  }

  render() {
    const { inputValue, visiblePeople } = this.state;

    return (
      <div className="App">
        <h1>
          Number of people:
          {visiblePeople.length}
        </h1>
        <input
          onChange={this.filterPeople}
          value={inputValue}
          type="text"
          placeholder="Serch by name, mother or father"
          size="40"
        />
        <PeopleTable
          people={visiblePeople}
          sortPeople={this.sortPeople}
        />
      </div>
    );
  }
}

export default App;
