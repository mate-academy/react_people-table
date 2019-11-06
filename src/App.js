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
        case 'id':
          return [...filterOfPeople].sort((a, b) => a.id - b.id);
        case 'name':
          return [...filterOfPeople].sort((a, b) => a.name.localeCompare(b.name));
        case 'sex':
          return [...filterOfPeople].sort((a, b) => a.sex.localeCompare(b.sex));
        case 'age':
          return [...filterOfPeople].sort((a, b) => a.age - b.age);
        case 'born':
          return [...filterOfPeople].sort((a, b) => a.born - b.born);
        case 'died':
          return [...filterOfPeople].sort((a, b) => a.died - b.died);
        case 'century':
          return [...filterOfPeople].sort((a, b) => a.century - b.century);
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
    const doneData = this.getFilterFromPeople(this.state);

    return (
      <>
        <div className="main-input">
          <input
            className="item"
            placeholder="Keyboard name"
            value={filterOfValue}
            onChange={this.handlerFilterValue}
          />
        </div>
        <h2>Filter by:</h2>
        <div className="main_buttons">
          <button
            onClick={this.handlerSortValue}
            type='submit'>
            Id
          </button>
          <button
            onClick={this.handlerSortValue}
            type='submit'>
            Name
          </button>
          <button
            onClick={this.handlerSortValue}>
            Sex
          </button>
          <button
            onClick={this.handlerSortValue}>
            Age
          </button>
          <button
            onClick={this.handlerSortValue}
            type='submit'>
            Born
          </button>
          <button
            onClick={this.handlerSortValue}
            type='submit'>
            Century
          </button>
        </div>
        <PersonTable people={doneData} />
      </>
    );
  }
}

export default App;
