import React, { Component } from 'react';
import './App.scss';

import PeopleTable from './components/PeopleTable'

const getPeopleFromServer = async () => {
  const promise = await fetch('https://mate-academy.github.io/react_people-table/api/people.json')
  const people = await promise.json();
  return people;
}

class App extends Component {
  state = {
    people: [],
    isLoaded: false,
    personClass: {},
  }

  getPersonClass = (person) => {
    let personClass = person.sex === 'm'
        ? 'person--male'
        : 'person--female';

      if (person.born < 1650) {
        personClass += ' person--born-before-1650';
      }

      if (person.died > 1800) {
        personClass += ' person--died-after-1800';
      }

      if (person.age > 65) {
        personClass += ' person--long-live';
      }

      personClass += ` person--lived-in-${person.century}`;

      if (person.childrenList.length < 0) {
        person.sex === 'm'
          ? personClass += ' person--father'
          : personClass += ' person--mother';
      }

      return personClass;
  }

  getData = async() => {
    const people = await getPeopleFromServer();
    const poepleWithAdditionalFields = people.map(person => ({
      ...person,
      age: (person.died - person.born),
      century: Math.ceil(person.died/100),
      childrenList: people.filter( child =>
        child.father === person.name
        || child.mother === person.name
        ).map(child => child.name)
        .join(', '),
    }));

    const poepleWithClassNames = poepleWithAdditionalFields.map(person => ({
      ...person,
      personClass: this.getPersonClass(person),
    }))

    this.setState({
      people: poepleWithClassNames,
      isLoaded: true,
    })
  }

  render() {
    const { people, isLoaded } = this.state;

    return (
      <div className="App">
        <h1>People table {people.length}</h1>
        <button onClick={this.getData} hidden={isLoaded}>
          Load list of people
        </button>
        <PeopleTable people={people} />
      </div>
    );
  }

}

export default App;
