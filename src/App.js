import React from 'react';
import './App.css';
import PeopleTable from './PeopleTable';
import NewPerson from './NewPerson';
import people from './people';

const date = new Date();
const availableYears = [];

const minWomanBirth = Math.min(...people
  .filter(person => person.sex === 'f')
  .map(person => person.born));
const minManBirth = Math.min(...people
  .filter(person => person.sex === 'm')
  .map(person => person.born));

for (let i = Math.max(minWomanBirth, minManBirth) + 16;
  i <= date.getFullYear(); i += 1) {
  availableYears.push(i);
}

const getPeopleWithChildren = listOfPeople => (
  listOfPeople.map((person, index) => ({
    ...person,
    children: listOfPeople
      .filter(child => (
        child.father === person.name || child.mother === person.name)),
    age: person.died - person.born,
    century: Math.ceil(person.died / 100),
    id: index + 1,
  }))
);

class App extends React.Component {
  state = {
    allPeople: getPeopleWithChildren(people),
    currentSortingTitle: '',
    searchingItem: '',
    reversed: false,
  };

  handleSearchingInputChange = ({ target: { value } }) => {
    this.setState({
      searchingItem: value.toLowerCase(),
    });
  };

  getSearchedPeople = (listOfPeople, searchingName) => (
    listOfPeople.filter(person => (
      person.name.toLowerCase().includes(searchingName)
      || (person.father || '').toLowerCase()
        .includes(searchingName)
      || (person.mother || '').toLowerCase()
        .includes(searchingName)
    )));

  getSortedPeople = (listOfPeople, sortingTitle) => (
    listOfPeople.sort((firstPerson, secondPerson) => (
      typeof firstPerson[sortingTitle] === 'string'
        ? firstPerson[sortingTitle].localeCompare(secondPerson[sortingTitle])
        : firstPerson[sortingTitle] - secondPerson[sortingTitle]
    )));

  setSortBy = (sortingTitle) => {
    this.setState(({ allPeople, currentSortingTitle }) => ({
      allPeople: currentSortingTitle === sortingTitle
        ? [...allPeople].reverse()
        : this.getSortedPeople(allPeople, sortingTitle),
      reversed: currentSortingTitle === sortingTitle,
      currentSortingTitle: sortingTitle,
    }));
  };

  addPerson = (name, sex, born, died, mother, father) => {
    this.setState(prevState => ({
      allPeople: [
        ...prevState.allPeople,
        {
          name,
          sex,
          born,
          died,
          mother,
          father,
          children: prevState.allPeople
            .filter(child => (
              child.father === name || child.mother === name)),
          age: died < Infinity ? died - born : date.getFullYear() - born,
          century:
            died < Infinity ? Math.ceil(died / 100)
              : Math.ceil(date.getFullYear() / 100),
          id:
            Math.max(...prevState.allPeople.map(person => person.id)) + 1,
        },
      ],
    }));
  };

  updateChildren = () => {
    this.setState(prevState => ({
      allPeople:
        prevState.allPeople.map(person => (
          {
            ...person,
            children: prevState.allPeople
              .filter(child => (
                child.father === person.name || child.mother === person.name)),
          }
        )),
    }));
  };

  updateSortedPeople = () => {
    this.setState(prevState => ({
      allPeople: prevState.reversed
        ? this
          .getSortedPeople(prevState.allPeople, prevState.currentSortingTitle)
          .reverse()
        : this
          .getSortedPeople(prevState.allPeople, prevState.currentSortingTitle),
    }));
  };

  render() {
    const { currentSortingTitle, searchingItem, allPeople } = this.state;

    return (
      <div className="people">
        <NewPerson
          addPerson={this.addPerson}
          updateChildren={this.updateChildren}
          updateSortedPeople={this.updateSortedPeople}
          peopleList={allPeople}
          years={availableYears}
        />
        <input
          onChange={this.handleSearchingInputChange}
          className="people__search"
          type="text"
          placeholder="Search"
        />
        <PeopleTable
          people={this.getSearchedPeople(allPeople, searchingItem)}
          setSortBy={this.setSortBy}
          sortingTitle={currentSortingTitle}
        />
      </div>
    );
  }
}

export default App;
