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
    const peopleModified = people.map((person, index) => ({
      ...person,
      id: index + 1,
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

    sortByField = (field) => {
      this.setState( {
        sort: field,
      })

      this.setState(prevState => ({
      peopleCopy: prevState.peopleCopy.sort(
        (a, b) => a.field > b.field
      ),
    }
    ));
  }

  render() {
    return (
      <div className="app">
        <h1>
          Number of items:
          {this.state.peopleCopy.length}
        </h1>
        <PeopleTable peoples={this.state.peopleCopy} sorting ={this.sortByField} />
      </div>
    );
  }
}

export default App;
