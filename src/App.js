import React from 'react';
import PeopleTable from './components/Peopletable';
import './App.css';
import sortFunc from './components/sortFunc';

const url = 'https://mate-academy.github.io/react_people-table/api/people.json';

const getPeople = async () => {
  const responce = await fetch(url);
  return await responce.json();
};

const getFullPeople = async () => {
  const peopleFromServer = await getPeople();
  return peopleFromServer.map((person, index) => ({
    id: index + 1,
    ...person,
    father: person.father || ' ',
    mother: person.father || ' ',
    age: person.died - person.born,
    century: Math.ceil(person.died / 100),
    children: peopleFromServer.filter(
      human => human.father === person.name || human.mother === person.name
    ).map(unit => unit.name).join(', '),
  }));
};

class App extends React.Component {
  people = [];
  state = {
    tempPhrase: '',
    valueForSort: '',
    visiblePeople: [],
    selectedPersonId: null,
  }

  async componentDidMount() {
    const peopleFromServer = await getFullPeople();

    this.setState({
      people: peopleFromServer,
      visiblePeople: peopleFromServer,
      valueForSort: 'id',
    });
  }

  getSelect = (id) => {
    this.setState({
      selectedPersonId: id,
    });
  }

  getClassNameOfPerson = (person) => {
    let className = '';
    if (person.id === this.state.selectedPersonId) {
      className = 'person selectedPerson';
    } else {
      className = 'person';
    }

    if (person.sex === 'm') {
      className += ' person--male';
    } else {
      className += ' person--female';
    }

    if (person.sex === 'm' && person.children.length > 0) {
      className += ' person--father';
    }

    if (person.sex === 'f' && person.children.length > 0) {
      className += ' person--mother';
    }

    if ((person.died - person.born) > 65) {
      className += ' livedOver65Years';
    }

    return className;
  };

  filterPhrase = (event) => {
    const tempPhrase = event.target.value.toLowerCase();

    const filteredPeople = this.state.people.filter(person => (
      person.name.toLowerCase().includes(tempPhrase)
      || person.father.toLowerCase().includes(tempPhrase)
      || person.mother.toLowerCase().includes(tempPhrase)
    ));

    this.setState({
      visiblePeople: filteredPeople,
      tempPhrase,
    });
  }

  sortBy = (valueForSort) => {
    this.setState({
      valueForSort,
    });

    this.setState(prevState => ({
      visiblePeople: sortFunc(prevState),
    }));
  }

  render() {
    const {visiblePeople} = this.state;
    return (
      <main>
        <h1>
          People table
          {visiblePeople.length}
        </h1>
        <form>
          <input
            type="text"
            placeholder="filter by name, mother and father"
            onInput={this.filterPhrase}
          />
          <div className="button-list">
            <button
              type="button"
              className="button-sort"
              onClick={() => this.sortBy('id')}
            >
              Sort ID
            </button>
            <button
              type="button"
              className="button-sort"
              onClick={() => this.sortBy('name')}
            >
              Sort NAME
            </button>
            <button
              type="button"
              className="button-sort"
              onClick={() => this.sortBy('born')}
            >
              Sort BIRTH
            </button>
            <button
              type="button"
              className="button-sort"
              onClick={() => this.sortBy('died')}
            >
              Sort DEATH
            </button>
            <button
              type="button"
              className="button-sort"
              onClick={() => this.sortBy('age')}
            >
              Sort AGE
            </button>
          </div>
        </form>

        <PeopleTable
          people={visiblePeople}
          getClassNameOfPerson={this.getClassNameOfPerson}
          selectedPersonId={this.state.selectedPersonId}
          getSelect={this.getSelect}
        />
      </main>
    );
  }
}

export default App;
