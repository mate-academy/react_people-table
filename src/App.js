import React from 'react';
import {getPeopleFromApi} from './Api';
import PersonTable from './components/PersonTable/PersonTable';
import { createSelector } from 'reselect';

class App extends React.Component {
  state = {
    people: [],
    filterOfPeople: [],
    sortValue: null,
    filterOfValue: '',
  };

  componentDidMount() {
    this.loadData();
  }

  getFilterFromPeople = createSelector(
    [
      state => state.people,
      state => state.filterOfValue,
      state => state.sortValue,
    ],
    (people, filterQuery, sortQuery) => {
      const filterOfPeople = people.filter(person =>
        person.name.toLowerCase().includes(filterQuery.toLowerCase())
        || person.mother.toLowerCase().includes(filterQuery.toLowerCase())
        || person.father.toLowerCase().includes(filterQuery.toLowerCase()));

      switch (sortQuery) {
        case 'Id':
          return filterOfPeople.sort((a, b) => a.id - b.id);
        case 'Name':
          return filterOfPeople.sort((a, b) => a.name.localeCompare(b.name));
        case 'Sex':
          return filterOfPeople.sort((a, b) => a.sex.localeCompare(b.sex));
        case 'Age':
          return filterOfPeople.sort((a, b) => a.age - b.age);
        case 'Born':
          return filterOfPeople.sort((a, b) => a.born - b.born);
        case 'Died':
          return filterOfPeople.sort((a, b) => a.died - b.died);
        case 'Сentury':
          return filterOfPeople.sort((a, b) => a.century - b.century);
        default:
          return filterOfPeople;
      }
    }
  );

  loadData = async () => {
    const people = await getPeopleFromApi();
    const mapPeople = people.map((person, index) => ({
      ...person,
      id: index + 1,
      age: person.died - person.born,
      century: Math.ceil(person.died / 100),
      father: person.father ? person.father : '',
      mother: person.mother ? person.mother : '',
      children: people.filter(child => child.father === person.name || child.mother === person.name),
    }));

    this.setState({
      people: mapPeople,
      filterOfPeople: mapPeople,
    });
  };

  handlerFilterValue = (event) => {
    this.setState({
      filterOfValue: event.target.value,
    });
  };

  handlerSortValue = (event) => {
    this.setState({
      sortValue: event.target.textContent,
    });
  };

  render() {
    const { filterOfValue } = this.state;
    const dataResult = this.getFilterFromPeople(this.state);

    return (
      <>
        <div className="main-input ui left icon input">
          <input
            type="text"
            placeholder="Search users..."
            className="item"
            value={filterOfValue}
            onChange={this.handlerFilterValue}
          />
          <i aria-hidden="true" className="users icon"></i>
        </div>
        <h2>Filter by:</h2>
        <div className="main_buttons">
          <button className="ui primary button"
            onClick={this.handlerSortValue}
            type='submit'>
            Id
          </button>
          <button className="ui primary button"
            onClick={this.handlerSortValue}
            type='submit'>
            Name
          </button>
          <button className="ui primary button"
            onClick={this.handlerSortValue}
            type='submit'>
            Sex
          </button>
          <button className="ui primary button"
            onClick={this.handlerSortValue}
            type='submit'>
            Age
          </button>
          <button className="ui primary button"
            onClick={this.handlerSortValue}
            type='submit'>
            Born
          </button>
          <button className="ui primary button"
            onClick={this.handlerSortValue}
            type='submit'>
            Century
          </button>
        </div>
        <PersonTable people={dataResult} />
      </>
    );
  }
}

export default App;
