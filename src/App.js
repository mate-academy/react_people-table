import React from 'react';
import { createSelector } from 'reselect';

import PeopleTable from './components/PeopleTable/PeopleTable';

const filterInput = (inputValue, peopleList) => {
  return [...peopleList]
    .filter(person => {
      if ( person.name.toLowerCase().includes(inputValue) ||
           person.mother.toLowerCase().includes(inputValue) ||
           person.father.toLowerCase().includes(inputValue)) {
              return person;
            }
    })
}

const filterSortMemo = createSelector(
  [
    state => state.inputValue,
    state => state.sortType,
    state => state.peopleList,
  ],
  ( inputValue, sortType, peopleList ) => {
    const filteredList = filterInput(inputValue, peopleList);
    switch(sortType) {
      case 'id':
        return filteredList
          .sort((a,b) => a - b);
      case 'name':
        return filteredList
          .sort((a,b) => a.name.localeCompare(b.name));
      case 'sex':
        return filteredList
          .sort((a,b) => b.sex.localeCompare(a.sex));
      case 'born':
        return filteredList
          .sort((a,b) => a.born - b.born);
      case 'died':
          return filteredList
            .sort((a,b) => a.died - b.died);
      case 'age':
          return filteredList
            .sort((a,b) => a.age - b.age);
      case 'century':
          return filteredList
            .sort((a,b) => a.century - b.century);
      default:
        return filteredList;
    }
  }
)

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      peopleList: [],
      peopleListError: false,
      personId: 1,
      isLoading: true,
      inputValue: '',
      sortType: 'all',
    }
  }

  getPeopleData = async () => {
    const response = await fetch('/api/people.json');

    return response.json();
  }

  componentDidMount() {
    this.getPeopleData()
      .then((people) => {
        const addSomeinfoToPeople = people
          .map(person => {
            const age = person.died - person.born;
            const century = Math.ceil(person.died / 100);
            const personId = this.state.personId;
            const mother = person.mother ? person.mother : '';
            const father = person.father ? person.father : '';
            const children = this.findChildren(person, people);


            this.setState({ personId: this.state.personId + 1 })
            return {
              ...person,
              age: Number(age),
              century: Number(century),
              selected: false,
              id: personId,
              mother: mother,
              father: father,
              children: children,
            }
          })

        this.setState({ peopleList: addSomeinfoToPeople, isLoading: false })
      })
      .catch(() =>
        this.setState({ peopleListError: true })
      )
  }

  findChildren = (user, peopleArr) => {
    const childrenArr = [];
    peopleArr.forEach((person) => {
      if (user.name === person.father || user.name === person.mother) {
          childrenArr.push(person.name);
      };
    })

    return childrenArr;
  }

  selectPerson = (id) => {
    const { peopleList } = this.state;
    const checkedPersonInList = peopleList
      .map(person => {
        if (person.id === id) {
          person.selected = true;
          return person;
        } else {
          person.selected = false;
          return person;
        }
      })

      this.setState(prev => {
        return {
          ...prev,
          peopleList: checkedPersonInList,
        }
      })
  }

  inputValueChange = (event) => {
    this.setState({ inputValue: event.target.value })
  }

  sortTypeChange = (type) => {
    this.setState({ sortType: type })
  }

  render() {

    if (this.state.isLoading) {

      return (
        <div>Loading...</div>
      )
    } else {

      return (
        <PeopleTable
          filterSortList={filterSortMemo(this.state)}
          selectPerson={this.selectPerson}
          inputValueChange={this.inputValueChange}
          inputValue={this.state.inputValue}
          sortTypeChange={this.sortTypeChange}
        />
      )
    }
  }
}

export default App;
