/* eslint-disable max-len */
import React from 'react';
import getData from './api/getData';
import PeopleTable from './PeopleTable';
import './App.css';

class App extends React.Component {
  state = {
    peopleToShow: [],
    direction: -1,
  };

  async componentDidMount() {
    const resultOfApi = await getData();
    const mappedPeople = resultOfApi.map((person, index) => ({
      ...person,
      century: Math.ceil(person.died / 100),
      age: person.died - person.born,
      id: index + 1,
      children: resultOfApi.filter(child => (
        child.father === person.name || child.mother === person.name
      )),
    }));

    this.setState({
      peopleToShow: mappedPeople,
    });
  }

  sortPeople = (field) => {
    if (field === 'id') {
      this.setState(prevState => ({
        peopleToShow: [...prevState.peopleToShow.sort((a, b) => (a.id - b.id) * prevState.direction)],
        direction: prevState.direction * -1,
      }));
    } else if (field === 'name') {
      this.setState(prevState => ({
        peopleToShow: [...prevState.peopleToShow.sort((a, b) => a.name.localeCompare(b.name) * prevState.direction)],
        direction: prevState.direction * -1,
      }));
    } else if (field === 'sex') {
      this.setState(prevState => ({
        peopleToShow: [...prevState.peopleToShow.sort((a, b) => a.sex.localeCompare(b.sex) * prevState.direction)],
        direction: prevState.direction * -1,
      }));
    } else if (field === 'age') {
      this.setState(prevState => ({
        peopleToShow: [...prevState.peopleToShow.sort((a, b) => (a.age - b.age) * prevState.direction)],
        direction: prevState.direction * -1,
      }));
    }
  }

  render() {
    const { peopleToShow } = this.state;

    return (
      <div>
        <PeopleTable
          people={peopleToShow}
          sortPeople={this.sortPeople}
        />
      </div>
    );
  }
}

export default App;
