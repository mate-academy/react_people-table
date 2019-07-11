import React from 'react';
import PeopleTable from './PeopleTable';
import './App.css';

const peopleFromServer = 'https://mate-academy.github.io/react_people-table/api/people.json';

const getPeople = async() => {
  const response = await fetch(peopleFromServer);
  const people = await response.json();
  return people;
};

class App extends React.Component {
  state = {
    people: [],
  }

  async componentDidMount() {
    const people = await getPeople();

    this.setState({
      people,
    });
  }

  render() {
    return (
      <div className="app">
        <h1>
          Number of items:
          {this.state.people.length}
        </h1>
        <PeopleTable peoples={this.state.people} />
      </div>
    );
  }
}

export default App;
