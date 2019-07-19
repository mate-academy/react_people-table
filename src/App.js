import React from 'react';
import PeopleTable from './components/Peopletable';
import './App.css';
import sortFunc from './components/sortFunc';
import getPeople from './components/getPeople';

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
      (person.name + person.father + person.mother).toLowerCase().includes(tempPhrase)
    ));

    this.setState({
      visiblePeople: filteredPeople,
      tempPhrase,
    });
  }

  sortBy = (valueForSort) => {

    this.setState(prevState => ({
      visiblePeople: sortFunc(prevState.visiblePeople, valueForSort, prevState.valueForSort === valueForSort),
      valueForSort,
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
            className="input"
            placeholder="filter by name, mother and father"
            onInput={this.filterPhrase}
          />
        </form>

        <PeopleTable
          people={visiblePeople}
          getClassNameOfPerson={this.getClassNameOfPerson}
          selectedPersonId={this.state.selectedPersonId}
          getSelect={this.getSelect}
          sortBy={this.sortBy}
        />
      </main>
    );
  }
}

export default App;
