import React from 'react';
import PeopleTable from './PeopleTable';

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
    const { filtredPeople, sortStatus } = this.state;
    console.log('render', ' filtredPeople:', filtredPeople);
    return (
      <div className="App">
        <h1>People table {filtredPeople.length} </h1>

        <input
          type="text"
          placeholder="filter name, mother and father"
          onInput={this.filterByNameAndParents}
        />

        <PeopleTable people={filtredPeople} sortStatus={sortStatus} updateAppState={this.updateAppState} />
      </div>
    );
  }
};

export default App;
