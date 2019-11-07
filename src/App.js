import React from 'react';
import './App.css';
import { Input, Button } from 'semantic-ui-react';
import { createSelector } from 'reselect';
import { getData } from './utils';
import TablePeople from './Components/tablePeople/TablePeople';
import FilterButtons from "./Components/filterButtons/FilterButtons";

class App extends React.Component {
  state = {
    people: [],
    filteredPeople: [],
    filterValue: '',
    sortValue: null,
  };

  componentDidMount() {
    this.loadData();
  }

  getPeople = state => state.people;

  getFilterQuery = state => state.filterValue;

  getSortQuery = state => state.sortValue;

  outputData = createSelector(
    [this.getPeople, this.getFilterQuery, this.getSortQuery],
    (people, filterQuery, sortQuery) => {
      const filteredPeople = people.filter(person =>
        person.name.toLowerCase().includes(filterQuery.toLowerCase())
        || person.father.toLowerCase().includes(filterQuery.toLowerCase())
        || person.mother.toLowerCase().includes(filterQuery.toLowerCase()));

      switch (sortQuery) {
        case 'id':
          return filteredPeople.sort((a, b) => a.id - b.id);
        case 'name':
          return filteredPeople.sort((a, b) => a.name.localeCompare(b.name));
        case 'sex':
          return filteredPeople.sort((a, b) => a.sex.localeCompare(b.sex));
        case 'age':
          return filteredPeople.sort((a, b) => a.age - b.age);
        case 'born':
          return filteredPeople.sort((a, b) => a.born - b.born);
        case 'died':
          return filteredPeople.sort((a, b) => a.died - b.died);
        case 'century':
          return filteredPeople.sort((a, b) => a.century - b.century);
        default:
          return filteredPeople;
      }
    }
  );

  loadData = async () => {
    const people = await getData();
    const prepearedPeople = people.map((person, index) => ({
      ...person,
      id: index + 1,
      age: person.died - person.born,
      century: Math.ceil(person.died / 100),
      father: person.father ? person.father : '',
      mother: person.mother ? person.mother : '',
      children: people.filter(child => child.father === person.name || child.mother === person.name),
    }));

    this.setState({
      people: prepearedPeople,
      filteredPeople: prepearedPeople,
    });
  };

  changeFilterValue = (event) => {
    this.setState({
      filterValue: event.target.value,
    });
  };

  changeSortValue = (event) => {
    this.setState({
      sortValue: event.target.textContent,
    });
  };


  render() {
    const { filterValue } = this.state;
    const doneData = this.outputData(this.state);

    return (
      <>
        <div className="wrapper-input">
          <Input
            className="item"
            placeholder="Keyboard filter by name, mother and father"
            value={filterValue}
            onChange={this.changeFilterValue}
          />
        </div>
        <h2>Filter by :</h2>
        <FilterButtons changeSortValue={this.changeSortValue}/>
        <TablePeople people={doneData}/>
      </>
    );
  }
}
export default App;
