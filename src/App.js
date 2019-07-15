import React from 'react';
import PeopleTable from './components/peopletable';
import './App.css';

const getPeople = async () => {
  const responce = await fetch('https://mate-academy.github.io/react_people-table/api/people.json');
  return await responce.json();
};

const getFullPeople = async () => {
  const peopleFromServer = await getPeople();
  return peopleFromServer.map((person) => ({
    ...person,
    children: peopleFromServer.filter(
      (human) => human.father === person.name || human.mother === person.name
      ).map(unit => unit.name).join(', '),
  }));
};

class App extends React.Component {
  state = {
    people: [],
  }

  async componentDidMount() {
    const peopleFromServer = await getFullPeople();

    this.setState({
      people: peopleFromServer,
    });
  }

  render() {
    return (
      <main>
        <h1>
          People table
          {this.state.people.length}
        </h1>
        <PeopleTable people={this.state.people} />
      </main>
    );
  }
}

export default App;
