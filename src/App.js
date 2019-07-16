import React from 'react';
import PeopleTable from './components/peopleTable/PeopleTable';
import NewPerson from './components/newPerson/NewPerson';

const getChildren = (people, person) => (
  people.filter(currenPerson => (
    currenPerson.mother === person.name || currenPerson.father === person.name
  )));

const getArrFromName = (name, usersValue) => {
  if (name) {
    if (usersValue.split(' ').length > 1) {
      return name.toLowerCase().startsWith(usersValue.toLowerCase());
    }

    const arrFromName = name.toLowerCase().split(' ');
    return arrFromName.some(item => item.startsWith(usersValue.toLowerCase()));
  }

  return false;
};

class App extends React.Component {
  state = {
    listOfPeople: [],
    filtredPeople: [],
    sortStatus: 1,
    showNewPersonForm: false,
  }

  componentDidMount() {
    fetch('./api/people.json')
      .then(response => response.json())
      .then((people) => {
        const peopleWhithChildren = people.map((currentPerson, currentIndex) => (
          {
            ...currentPerson,
            id: currentIndex,
            age: currentPerson.died - currentPerson.born,
            children: getChildren(people, currentPerson),
          }
        ));

        this.setState({
          listOfPeople: peopleWhithChildren,
          filtredPeople: peopleWhithChildren,
        });
      });
  }

  filterByNameAndParents = (event) => {
    const usersValue = event.target.value;

    this.setState(prevState => ({
      filtredPeople: prevState.listOfPeople.filter((currentPerson) => {
        const byName = getArrFromName(currentPerson.name, usersValue);
        const byMother = getArrFromName(currentPerson.mother, usersValue);
        const byFather = getArrFromName(currentPerson.father, usersValue);

        return byName || byMother || byFather;
      }),
    }));
  }

  updateAppState = (config) => {
    this.setState(config);
  }

  render() {
    const { filtredPeople, sortStatus, listOfPeople } = this.state;

    return (
      <div className="App">
        <h1>
          People table
          {filtredPeople.length}
        </h1>

        <input
          type="text"
          placeholder="Enter the name for search"
          onInput={this.filterByNameAndParents}
        />
        <br />
        <br />

        <button
          type="button"
          onClick={() => this.setState({ showNewPersonForm: true })}
        >
          Add new person
        </button>

        {this.state.showNewPersonForm && <NewPerson updateAppState={this.updateAppState} people={listOfPeople} />}

        <PeopleTable
          people={filtredPeople}
          sortStatus={sortStatus}
          updateAppState={this.updateAppState}
        />

      </div>
    );
  }
}

export default App;
