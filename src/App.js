import React from 'react';
import { createSelector } from 'reselect';
import { Input } from 'semantic-ui-react';
import peopleList from './api/Api';
import PeopleTable from './components/peopleTable/PeopleTable';

class App extends React.Component {
  state = {
    people: [],
    filterQuery: '',
    sortType: '',
  };

  sortedPeople = createSelector(
    [
      state => state.people,
      state => state.filterQuery,
      state => state.sortType,
    ],
    (people, filterQuery, sortType) => {
      const lowerCaseQuery = filterQuery.toLowerCase();
      const filteredPeople = people
        .filter(person => person.name.toLowerCase().includes(lowerCaseQuery)
          || (person.mother || '').toLowerCase().includes(lowerCaseQuery)
          || (person.father || '').toLowerCase().includes(lowerCaseQuery));

      switch (sortType) {
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
    this.getData();
  }

  getData = () => {
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
            children: people
              .filter(child => (child.mother === person.name)
                || (child.father === person.name)),
          });
        }),
      });
    });
  }

  sortBy = (type) => {
    this.setState({
      sortType: type,
    });
  };

  queryChange = (event) => {
    this.setState({
      filterQuery: event.target.value,
    });
  };

  render() {
    const people = this.sortedPeople(this.state);
    const { filterQuery } = this.state;

    return (
      <>
        <Input
          type="text"
          value={filterQuery}
          onChange={this.queryChange}
          placeholder="Enter name"
        />
        <PeopleTable people={people} sort={this.sortBy} />
      </>
    );
  }
}

export default App;
