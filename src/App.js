import React from 'react';
import { createSelector } from 'reselect';
import getPeople from './api';
import PeopleTable from './components/PeopleTable';
import SortButtons from './components/SortButtons';

const filterPeople = (people, filterStr) => (
  people.filter(person => (
    person.name.toLowerCase().includes(filterStr)
      || (person.mother || '').toLowerCase().includes(filterStr)
      || (person.father || '').toLowerCase().includes(filterStr)
  ))
);

const sortPeople = (people, sortMethod) => {
  let sortedPeople = null;

  switch (sortMethod) {
    case 'by name':
      sortedPeople = [...people]
        .sort((a, b) => (
          a.name.localeCompare(b.name)
        ));
      break;

    case 'by id':
      sortedPeople = [...people];
      break;

    case 'by sex':
      sortedPeople = [...people]
        .sort(a => (
          a.sex === 'f' ? 1 : -1
        ));
      break;

    case 'by birth year':
      sortedPeople = [...people]
        .sort((a, b) => (
          a.born - b.born
        ));
      break;

    case 'by year of death':
      sortedPeople = [...people]
        .sort((a, b) => (
          a.died - b.died
        ));
      break;

    case 'by age':
      sortedPeople = [...people]
        .sort((a, b) => (
          a.age - b.age
        ));
      break;

    case 'by century':
      sortedPeople = [...people]
        .sort((a, b) => (
          a.century - b.century
        ));
      break;

    default:
  }

  return sortedPeople;
};

const reformatPeopleList = createSelector(
  [
    state => state.people,
    state => state.filterStr.toLowerCase(),
    state => state.sortMethod,
  ],
  (people, filterStr, sortMethod) => (
    sortPeople(filterPeople(people, filterStr), sortMethod)
  )
);

class App extends React.Component {
  state = {
    people: [],
    selectedPersonId: 0,
    filterStr: '',
    sortMethod: 'by id',
  }

  componentDidMount() {
    getPeople()
      .then((people) => {
        let id = 0;

        this.setState({
          people: people.map((person) => {
            id += 1;

            return (
              {
                id,
                ...person,
                age: person.died - person.born,
                century: Math.ceil(person.died / 100),
              }
            );
          }),
        });
      });
  }

  selectPerson = (e) => {
    const personId = e.currentTarget.id;

    this.setState({
      selectedPersonId: personId,
    });
  }

  changeFilter = (e) => {
    this.setState({
      filterStr: e.target.value,
    });
  }

  changeSortMethod = (sortMethod) => {
    if (sortMethod !== this.state.sortMethod) {
      this.setState({
        sortMethod,
      });
    }
  }

  render() {
    const { selectedPersonId, filterStr } = this.state;
    const finalPeopleList = reformatPeopleList(this.state);

    return (
      <>
        <h1>
          <span>Number of people: </span>
          {this.state.people.length}
        </h1>
        <input
          type="text"
          value={filterStr}
          onChange={this.changeFilter}
          placeholder="Filter the people"
        />
        <SortButtons changeSortMethod={this.changeSortMethod} />
        <PeopleTable
          people={finalPeopleList}
          selectPerson={this.selectPerson}
          selectedPersonId={selectedPersonId}
        />
      </>
    );
  }
}

export default App;
