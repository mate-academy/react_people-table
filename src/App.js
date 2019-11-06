import React from 'react';
import './App.css';
import { Input, Select } from 'semantic-ui-react';
import { createSelector } from 'reselect';
import { getPeople } from './Api';
import PeopleTable from './Components/peopleTable/PeopleTable';
import NewPerson from './Components/newPerson/NewPerson';

class App extends React.PureComponent {
  state = {
    people: [],
    filterQuery: '',
    sortQuery: null,
  };

  componentDidMount() {
    this.loadPeopleFromServer();
  }

  getPeople = state => state.people;

  getFilterQuery = state => state.filterQuery;

  getSortQuery = state => state.sortQuery;

  getFilteredAndSortedPeople = createSelector(
    [this.getPeople, this.getFilterQuery, this.getSortQuery],
    (people, filterQuery, sortQuery) => {
      const filteredPeople = people.filter(person =>
        person.name.includes(filterQuery)
        || person.father.includes(filterQuery)
        || person.mother.includes(filterQuery));

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

  loadPeopleFromServer = async () => {
    const people = await getPeople();
    const modifiedPeople = people.map((person, index) => ({
      ...person,
      id: index + 1,
      age: person.died - person.born,
      century: Math.ceil(person.died / 100),
      father: person.father ? person.father : '',
      mother: person.mother ? person.mother : '',
      children: people.filter(child => child.father === person.name || child.mother === person.name),
    }));

    this.setState({
      people: modifiedPeople,
      filteredPeople: modifiedPeople,
    });
  };

  changeFilterValue = (event) => {
    this.setState({
      filterQuery: event.target.value,
    });
  };

  getSelectOptions = () => ([
    { key: 'id', value: 'id', text: 'id' },
    { key: 'name', value: 'name', text: 'name' },
    { key: 'sex', value: 'sex', text: 'sex' },
    { key: 'age', value: 'age', text: 'age' },
    { key: 'born', value: 'born', text: 'born' },
    { key: 'died', value: 'died', text: 'died' },
    { key: 'century', value: 'century', text: 'century' },
  ]);

  changeSelectValue = (event) => {
    this.setState({
      sortQuery: event.target.textContent,
    });
  };

  addNewPerson = (name, bornDate, deathDate, gender, mother, father) => {
    this.setState((prevState) => {
      const { people } = prevState;
      const newPerson = {
        id: people.length + 1,
        name,
        mother,
        father,
        sex: gender,
        born: bornDate,
        died: deathDate,
        age: deathDate - bornDate,
        century: Math.ceil(deathDate / 100),
        children: people.filter(child => child.father === name || child.mother === name),
      };

      return ({
        people: [...people, newPerson],
      });
    });
  }

  render() {
    const { filterQuery } = this.state;
    const selectOptions = this.getSelectOptions();
    const relevantPeople = this.getFilteredAndSortedPeople(this.state);

    return (
      <>
        <section className="optionsContainer">
          <Input className="option__item" placeholder="Filter..." value={filterQuery} onChange={this.changeFilterValue} />
          <Select className="option__item" placeholder="Sort by..." options={selectOptions} onChange={this.changeSelectValue} />
          <NewPerson className="option__item" people={this.state.people} addNewPerson={this.addNewPerson}/>
        </section>
        <PeopleTable people={relevantPeople} />
      </>
    );
  }
}
export default App;
