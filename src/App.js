import React from 'react';

import getPeoples from './api/peopleData'
import PeopleTable from './PeopleTable'
import { async } from 'q';

import './App.css'

class App extends React.Component {
  state = {
    peoples: [],
  }

  async componentDidMount() {
    const peopleData = await getPeoples();
    const peoples = peopleData.map(person => ({
      ...person,
      age: person.died - person.born,
      century: Math.ceil(person.died / 100),
      children: peopleData.filter(item => item.mother === person.name
        || item.father === person.name)
        .map(item => item.name)
        .join(', '),
    }));

    this.setState({
      peoples: peoples,
    });
  }

  render() {
    return (
      <div className="App">
        <h1 className='headline--number_people'>Number of people: {this.state.peoples.length}</h1>
        <PeopleTable peoples={this.state.peoples} />
      </div>
    )
  }
}

export default App;
