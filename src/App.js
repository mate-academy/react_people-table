import React from 'react';

import getPeoples from './api/peopleData'
import PeopleTable from './PeopleTable'
import { async } from 'q';

import './App.css'

const getArrFromName = (name, value) => {
  if (name) {
    if (value.split(' ').length > 1) {
      return name.toLowerCase().startsWith(value.toLowerCase());
    }

    const arrFromName = name.toLowerCase().split(' ');
    return arrFromName.some(item => item.startsWith(value.toLowerCase()));
  }

  return false;
};

class App extends React.Component {
  state = {
    people: [],
    visiblePeople: [],
    sortField: 'id',
    direction: -1,
  }

  async componentDidMount() {
    const peopleData = await getPeoples();
    const peoples = peopleData.map((person, index) => ({
      id: index + 1,
      ...person,
      age: person.died - person.born,
      century: Math.ceil(person.died / 100),
      children: peopleData.filter(item => item.mother === person.name
        || item.father === person.name)
        .map(item => item.name)
        .join(', '),
    }));

    this.setState({
      peoples,
      visiblePeople: peoples,
    });
  }

  getFilterPeoples = (event) => {
    const { value } = event.target;

    this.setState(prevState => ({
      visiblePeople: prevState.peoples.filter((person) => {
        const byName = getArrFromName(person.name, value);
        const byMother = getArrFromName(person.mother, value);
        const byFather = getArrFromName(person.father, value);

        return byName || byMother || byFather;
      }),
    }));
  }

  sortData = (sortItem) => {
    this.setState(state => ({
      direction: state.direction === 1 ? -1 : 1,
      visiblePeople: [...state.visiblePeople].sort((a, b) => {
        switch (typeof a[sortItem]) {
          case 'string':
            return this.state.direction * (a[sortItem].localeCompare(b[sortItem]));
          case 'number':
          case 'boolean':
            return this.state.direction * (a[sortItem] - b[sortItem]);
          default: return 0;
        }
      }),
    }));
  }

  render() {
    const { visiblePeople, sortData } = this.state;
    return (
      <div className='app'>
        <h1 className='headline--number_people'>
          Number of people: {visiblePeople.length}
        </h1>
        <form>
          <input
            onChange={this.getFilterPeoples}
            className='input-filter_name'
            type='text'
            placeholder='Enter the name of the person, her mother or father' />
        </form>
        <PeopleTable peoples={visiblePeople} sortPeople={this.sortData} />
      </div>
    )
  }
}

export default App;
