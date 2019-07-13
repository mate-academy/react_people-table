import React from 'react';
import PeopleTable from './PeopleTable';
import './App.css';

const peopleFromServer = 'https://mate-academy.github.io/react_people-table/api/people.json';

const getPeople = async () => {
  const response = await fetch(peopleFromServer);
  const people = await response.json();
  return people;
};

class App extends React.Component {
  state = {
    people: [],
    peopleCopy: [],
    clickedId: 1,
  }

  async componentDidMount() {
    const people = await getPeople();
    const peopleModified = people.map(person => ({
      ...person,
      age: person.died - person.born,
      century: Math.ceil(person.died / 100),
      children: people.filter(item => item.father === person.name
        || item.mother === person.name)
        .map(item => item.name)
        .join(', '),
    }));

    this.setState({
      peopleCopy: [...peopleModified],
      people: [...peopleModified],
    });
  }

  sortByField = () => {
    this.setState(prevState => ({
      peopleCopy: prevState.peopleCopy.sort(
        (a, b) => a.name.localeCompare(b.name)
      ),
    }
    ));
  }

  render() {
    return (
      <div className="app">
        <h1>
          Number of items:
          {this.state.people.length}
        </h1>
        <PeopleTable peoples={this.state.peopleCopy} sortName ={this.sortByField} />
      </div>
    );
  }
}

export default App;
