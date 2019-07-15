import React from 'react';
import getData from './api/getData';
import PeopleTable from './PeopleTable';
import './App.css';

class App extends React.Component {
  state = {
    people: [],
    peopleToShow: [],
    selectedId: null,
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
      people: mappedPeople,
      peopleToShow: mappedPeople,
    });
  }

  sortId = () => {
    this.setState(prevState => ({
      peopleToShow: [...prevState.peopleToShow.sort((a, b) => (a.id - b.id) * prevState.direction)],
      direction: prevState.direction * -1,
    }));
  }

  sortName = () => {
    this.setState(prevState => ({
      peopleToShow: [...prevState.peopleToShow.sort((a, b) => a.name.localeCompare(b.name) * prevState.direction)],
      direction: prevState.direction * -1,
    }));
  };

  render() {
    const { peopleToShow } = this.state;
    return (
      <div>
        <PeopleTable
          people={peopleToShow}
          handleClick={this.handleClick}
          sortId={this.sortId}
          sortName={this.sortName}
        />
      </div>
    );
  }
}

export default App;
