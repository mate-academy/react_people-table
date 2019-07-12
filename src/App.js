import React from 'react';
import './PeopleTable.css';
import PeopleTable from './components/PeopleTable';
import NewPerson from './components/NewPerson';
import peoplePromice from './API_DATA';

class App extends React.Component {
  state={
    peopleFromServer: [],
    people: [],
    filterInputValue: '',
    toggleNameSortOrder: 1,
    personRowSelected: false,
    personRowSelectedId: '',
  }

  async componentDidMount() {
    const peopleFromServer = await peoplePromice();

    const temp = this.addKeysToPersonInArr(peopleFromServer);

    this.setState({
      peopleFromServer: temp,
      people: temp,
    });
  }

  addKeysToPersonInArr = people => people
    .map((person, personIndex, peopleArr) => ({
      ...person,
      id: personIndex + 1,
      age: person.died - person.born,
      century: this.getCentury(person.died),
      children: this.getChildrenString(person, peopleArr),
    }))

  getCentury = died => (
    Math.ceil(died / 100)
  )

  getChildrenString = (person, peopleArr) => (peopleArr
    .filter(child => child.father === person.name
      || child.mother === person.name)
    .map(child => child.name)
    .join(', ')
  )

  handleFilterInput = (event) => {
    const { value } = event.target;

    this.setState({
      filterInputValue: value,
    });
  }

  isStrIncludeSubstr = (str, substr) => {
    if (str) {
      return str.toLowerCase().includes(substr.toLowerCase());
    }
    return false;
  }

  handleSubmit = (event) => {
    event.preventDefault();

    this.setState(prevState => ({
      people: prevState.peopleFromServer.filter(item => (
        this.isStrIncludeSubstr(item.name, prevState.filterInputValue)
        || this.isStrIncludeSubstr(item.mother, prevState.filterInputValue)
        || this.isStrIncludeSubstr(item.father, prevState.filterInputValue)
      )),
    }));
  }

  returnSortingFunction = (arr, sortKey, toggleSortOrder) => {
    switch (typeof arr[0][sortKey]) {
      case 'string':
        console.log([sortKey], 'bugaga');
        return (a, b) => toggleSortOrder * a[sortKey].localeCompare(b[sortKey]);

      case 'number':
        console.log(arr[0][sortKey], 'muahaha');
        return (a, b) => toggleSortOrder * (a[sortKey] - b[sortKey]);

      default:
        return 0;
    }
  }

  handleSort = (fieldName) => {
    this.setState(prevState => ({
      people: [...prevState.peopleFromServer]
        .sort(this.returnSortingFunction(
          [...prevState.peopleFromServer],
          fieldName, prevState.toggleNameSortOrder
        )),
      toggleNameSortOrder: -prevState.toggleNameSortOrder,
    }));
  }

  handlePersonRowClick = (personId) => {
    this.setState({
      personRowSelectedId: personId,
    });

    this.setState(prevState => ({
      personRowSelected: !prevState.personRowSelected,
    }));
  }

  handleNewPersonSubmit = (event) => {
    const newPersonObj = {
      name: event.target[0].value,
      sex: event.target[1].checked ? 'f' : 'm',
      born: event.target[3].value,
      died: event.target[4].value,
      mother: event.target[5].value,
      father: event.target[6].value,
    };

    this.setState(prevState => ({
      peopleFromServer:
        this.addKeysToPersonInArr(
          [...prevState.peopleFromServer, newPersonObj]
        ),
      people:
        this.addKeysToPersonInArr([...prevState.people, newPersonObj]),
    }));

    event.preventDefault();
  }

  render() {
    return (
      <div className="App">
        <h1>
People table
          {this.state.people.length}
        </h1>

        <NewPerson handleNewPersonSubmit={this.handleNewPersonSubmit} />

        <form onSubmit={this.handleSubmit}>
          <input
            type="text"
            placeholder="Filter by Name, Mother of Father"
            value={this.state.filterInputValue}
            onChange={this.handleFilterInput}
          />

          <button type="submit" className="button">Filter</button>
        </form>
        <PeopleTable
          people={this.state.people}
          handleSort={this.handleSort}
          handlePersonRowClick={this.handlePersonRowClick}
          personRowSelectedId={this.state.personRowSelectedId}
          personRowSelected={this.state.personRowSelected}
        />
      </div>
    );
  }
}

export default App;
