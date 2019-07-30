import React, { Component } from 'react';
import PeopleTable from './PeopleTable';
import './App.css';

const GetPeoples = async() => {
  const u = 'https://mate-academy.github.io/react_people-table/api/people.json';
  const response = await fetch(u);
  const people = await response.json();

  return people;
};

class App extends Component {
  state = {
    people: [],
    visiblePeople: [],
    inputValue: '',
    sortField: '',
  }

  async componentDidMount() {
    const people = await GetPeoples();

    const peopleWithProps = people.map((person, index) => ({
      id: index + 1,
      ...person,
      age: person.died - person.born,
      century: Math.ceil(person.died / 100),
      children: people.filter(relative => relative.mother === person.name
        || relative.father === person.name)
        .map(relative => relative.name)
        .join(', '),
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
        const filterFields = person.name + person.mother + person.father;

        return this.checkPersonInfo(filterFields, inputText);
      }),
    }));
  }

  sortPeople = (targetField) => {
    (targetField !== this.state.sortField)
      ? this.setState(prevstate => ({
        visiblePeople: [...prevstate.people].sort((a, b) => {
          switch (typeof a[targetField]) {
            case 'string':
              return a[targetField].localeCompare(b[targetField]);

            case 'boolean':
            case 'number':
              return a[targetField] - b[targetField];

            default:
              return 0;
          }
        }),
        sortField: targetField,
      }))
      : this.setState(prevstate => ({
        visiblePeople: [...prevstate.visiblePeople.reverse()],
      }));
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
