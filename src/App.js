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
    sortfieldName: '',
    toggleNameSortOrder: 1,
    personRowSelected: false,
    personRowSelectedId: 0,
    errorMessage: '',
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

  isArrIncludeSubstr = (str, substr) => {
    str = str.join('');
    substr = substr.trim();

    if (str) {
      return str.toLowerCase().includes(substr.toLowerCase());
    }
    return false;
  }

  sortingFunction = (arr, sortKey, toggleSortOrder) => {
    if (!sortKey) {
      return undefined;
    }

    switch (typeof arr[0][sortKey]) {
      case 'string':
        return (a, b) => toggleSortOrder * a[sortKey].localeCompare(b[sortKey]);

      case 'number':
        return (a, b) => toggleSortOrder * (a[sortKey] - b[sortKey]);

      default:
        return undefined;
    }
  }

  filteredSorteredPeople =
    (people, filterInputValue, sortfieldName, toggleNameSortOrder) => (
      people
        .filter(item => (this.isArrIncludeSubstr(
          [item.name, item.mother, item.father], filterInputValue
        )))
        .sort(this.sortingFunction(
          people, sortfieldName, toggleNameSortOrder
        ))
    )

  handleFilterInput = (event) => {
    const { value } = event.target;

    this.setState(prevState => ({
      people: this.filteredSorteredPeople(
        [...prevState.peopleFromServer],
        value,
        prevState.sortfieldName,
        -prevState.toggleNameSortOrder,
      ),

      filterInputValue: value,
    }));
  }

  handleSort = (fieldName) => {
    this.setState(prevState => ({
      people: this.filteredSorteredPeople(
        [...prevState.peopleFromServer],
        prevState.filterInputValue,
        fieldName,
        prevState.toggleNameSortOrder,
      ),
      toggleNameSortOrder: -prevState.toggleNameSortOrder,
      sortfieldName: fieldName,
    }));
  }

  handlePersonRowClick = (personId) => {
    this.setState({
      personRowSelectedId: personId,
    });

    if (this.state.personRowSelectedId === personId) {
      this.setState(prevState => ({
        personRowSelected: !prevState.personRowSelected,
      }));
    } else if (this.state.personRowSelectedId !== personId) {
      this.setState({
        personRowSelected: true,
      });
    }
  }

  handleNewPersonSubmit = (event) => {
    event.preventDefault();

    const newPersonObj = {
      name: event.target[0].value,
      sex: event.target[1].checked ? 'f' : 'm',
      born: event.target[3].value,
      died: event.target[4].value,
      mother: event.target[5].value,
      father: event.target[6].value,
    };

    const age = newPersonObj.died - newPersonObj.born;

    if (age < 0 || age > 150) {
      this.setState({
        errorMessage: 'Incorrect Age, or to much or not enough',
      });
    } else {
      this.setState(prevState => ({
        errorMessage: '',
        peopleFromServer:
          this.addKeysToPersonInArr(
            [...prevState.peopleFromServer, newPersonObj]
          ),
        people:
          this.addKeysToPersonInArr([...prevState.people, newPersonObj]),
      }));
    }
  }

  render() {
    const {
      people,
      errorMessage,
      filterInputValue,
      personRowSelectedId,
      personRowSelected,
    } = this.state;
    return (
      <div className="App">
        <h1>
          People table
          {people.length}
        </h1>
        <h2 className="error-message">{errorMessage}</h2>

        <NewPerson
          handleNewPersonSubmit={this.handleNewPersonSubmit}
          people={people}
        />

        <input
          type="text"
          placeholder="Filter by Name, Mother of Father"
          value={filterInputValue}
          onChange={this.handleFilterInput}
        />

        <PeopleTable
          people={people}
          handleSort={this.handleSort}
          handlePersonRowClick={this.handlePersonRowClick}
          personRowSelectedId={personRowSelectedId}
          personRowSelected={personRowSelected}
        />
      </div>
    );
  }
}

export default App;
