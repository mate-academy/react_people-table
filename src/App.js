import React, { Component } from 'react';
import { createSelector } from 'reselect';
import { PeopleTable } from './components/PeopleTable';

const filterInput = (inputValue, peopleList) => [...peopleList]
  .filter((person) => {
    if (person.name.toLowerCase().includes(inputValue.toLowerCase())
|| person.mother.toLowerCase().includes(inputValue.toLowerCase())
|| person.father.toLowerCase().includes(inputValue.toLowerCase())) {
      return person;
    }
  });

const filterSortMemo = createSelector(
  [
    state => state.inputValue,
    state => state.sortType,
    state => state.peopleList,
  ],
  (inputValue, sortType, peopleList) => {
    const filteredList = filterInput(inputValue, peopleList);

    switch (sortType) {
      case 'id':
        return filteredList
          .sort((a, b) => a - b);
      case 'name':
        return filteredList
          .sort((a, b) => a.name.localeCompare(b.name));
      case 'sex':
        return filteredList
          .sort((a, b) => b.sex.localeCompare(a.sex));
      case 'born':
        return filteredList
          .sort((a, b) => a.born - b.born);
      case 'died':
        return filteredList
          .sort((a, b) => a.died - b.died);
      case 'age':
        return filteredList
          .sort((a, b) => a.age - b.age);
      case 'century':
        return filteredList
          .sort((a, b) => a.century - b.century);
      default:
        return filteredList;
    }
  }
);

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      peopleList: [],
      hasError: false,
      isLoading: true,
      inputValue: '',
      sortType: 'all',
    };
  }

  componentDidMount() {
    this.getPeopleData()
      .then((people) => {
        const addInfo = people
          .map((person, ind) => {
            const age = person.died - person.born;
            const century = Math.ceil(person.died / 100);
            const mother = person.mother ? person.mother : '';
            const father = person.father ? person.father : '';
            const children = this.findChildren(person, people);

            return {
              ...person,
              age: Number(age),
              century: Number(century),
              selected: false,
              id: ind + 1,
              mother,
              father,
              children,
            };
          });

        this.setState({ peopleList: addInfo, isLoading: false });
      })
      .catch(() => this.setState({ hasError: true, isLoading: false }));
  }

  getPeopleData = async() => {
    const response = await fetch('/api/people.json');

    return response.json();
  };

  findChildren = (user, peopleArr) => {
    const childrenArr = [];

    peopleArr.forEach((person) => {
      if (user.name === person.father || user.name === person.mother) {
        childrenArr.push(person.name);
      }
    });

    return childrenArr;
  };

  selectPerson = (id) => {
    const { peopleList } = this.state;
    const checkedPersonInList = peopleList
      .map((person) => {
        if (person.id === id) {
          person.selected = true;

          return person;
        }

        person.selected = false;

        return person;
      });

    this.setState(prev => ({
      ...prev,
      peopleList: checkedPersonInList,
    }));
  };

  valueOnChange = (event) => {
    this.setState({ inputValue: event.target.value });
  };

  sortTypeChange = (type) => {
    this.setState({ sortType: type });
  };

  render() {
    const { isLoading, inputValue } = this.state;

    if (isLoading) {
      return (
        <div>Loading...</div>
      );
    }

    return (
      <div>
        <PeopleTable
          filterSortList={filterSortMemo(this.state)}
          selectPerson={this.selectPerson}
          valueOnChange={this.valueOnChange}
          inputValue={inputValue}
          sortTypeChange={this.sortTypeChange}
        />
      </div>
    );
  }
}

export default App;
