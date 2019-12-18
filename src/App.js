import React from 'react';
import './App.css';
import PeopleTable from './PeopleTable';
import NewPerson from './NewPerson';
import people from './people';

const date = new Date();

const getPeopleWithChildren = listOfPeople => (
  listOfPeople.map((person, index) => ({
    ...person,
    children: listOfPeople
      .filter(child => (
        child.father === person.name || child.mother === person.name))
      .map(currentChild => currentChild.name)
      .join(', '),
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
  };

  addPerson = (name, sex, born, died, mother, father) => {
    this.setState(prevState => ({
      allPeople: [
        ...prevState.allPeople,
        {
          name,
          sex,
          born,
          died: died || Infinity,
          mother,
          father,
          children: prevState.allPeople
            .filter(child => (
              child.father === name || child.mother === name))
            .map(currentChild => currentChild.name)
            .join(', '),
          age: died ? died - born : date.getFullYear() - born,
          century:
            died ? Math.ceil(died / 100)
              : Math.ceil(date.getFullYear() / 100),
          id:
            Math.max(...[...prevState.allPeople].map(person => person.id)) + 1,
        },
      ],
    }));
  };

  handleSearchingInputChange = ({ target: { value } }) => {
    this.setState(prevState => ({
      searchingItem: value,
    }));
  };

  getSearchedPeople = (listOfPeople, searchingName) => (
    listOfPeople.filter(person => (
      person.name.toLowerCase().includes(searchingName.toLowerCase())
        || (person.father || '').toLowerCase()
          .includes(searchingName.toLowerCase())
        || (person.mother || '').toLowerCase()
          .includes(searchingName.toLowerCase())
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
      currentSortingTitle: sortingTitle,
    }));
  };

  render() {
    const { currentSortingTitle, searchingItem, allPeople } = this.state;
    const visiblePeople = searchingItem
      ? [...this.getSearchedPeople(allPeople, searchingItem)]
      : [...allPeople];

    return (
      <div className="people">
        <NewPerson
          addPerson={this.addPerson}
          peopleList={allPeople}
        />
        <input
          onChange={this.handleSearchingInputChange}
          className="people__search"
          type="text"
          placeholder="Search"
        />
        <PeopleTable
          people={visiblePeople}
          setSortBy={this.setSortBy}
          sortingTitle={currentSortingTitle}
        />
      </div>
    );
  }
}

export default App;
