import React from 'react';
import { createSelector } from 'reselect';
import './App.css';

import peopleList from './components/Api/Fetching';
import PeopleTable from './components/peopleTable/PeopleTable';
import Filter from './components/filter/Filter';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      people: [],
      search: '',
      sortMethod: '',
    };
  }

  getSortedPeople = createSelector(
    [
      state => state.people,
      state => state.search,
      state => state.sortMethod,
    ],
    (people, search, sortMethod) => {
      const lowerCaseSearch = search.toLowerCase();
      const filteredPeople = people
        .filter(person => person.name.toLowerCase().includes(lowerCaseSearch)
          || (person.mother || '').toLowerCase().includes(lowerCaseSearch)
          || (person.father || '').toLowerCase().includes(lowerCaseSearch));

      switch (sortMethod) {
        case 'id':
          return filteredPeople.sort((a, b) => a.id - b.id);
        case 'name':
          return filteredPeople.sort((a, b) => a.name.localeCompare(b.name));
        case 'sex':
          return filteredPeople.sort((a, b) => a.sex.localeCompare(b.sex));
        case 'born':
          return filteredPeople.sort((a, b) => a.born - b.born);
        case 'died':
          return filteredPeople.sort((a, b) => a.died - b.died);
        case 'age':
          return filteredPeople.sort((a, b) => a.age - b.age);
        case 'century':
          return filteredPeople.sort((a, b) => a.century - b.century);
        default:
          return filteredPeople;
      }
    }
  );

  componentDidMount() {
    Promise.all([peopleList]).then(([people]) => {
      let id = 0;

      this.setState({
        people: people.map((person) => {
          id += 1;

          return ({
            id,
            ...person,
            age: person.died - person.born,
            century: Math.ceil(person.died / 100),
          });
        }),
      });
    });
  }

  sort = (type) => {
    this.setState({
      sortMethod: type,
    });
  };

  render() {
    const people = this.getSortedPeople(this.state);

    return (
      <div className="container">
        <Filter
          onValueChanged={value => this.setState({ search: value.trim() })}
        />
        <PeopleTable
          people={people}
          sort={this.sort}
        />
      </div>
    );
  }
}

export default App;
