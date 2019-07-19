import React from 'react';
import PeopleTable from './components/peopleTable/PeopleTable';
import NewPerson from './components/newPerson/NewPerson';
import './app.css';

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
    filterInput: '',
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
    const { value, name } = event.target;
    const people = [...this.state.listOfPeople];

    this.setState({
      [name]: value,
    });

    if (value !== '') {
      this.setState({
        filtredPeople: people.filter((currentPerson) => {
          const byName = getArrFromName(currentPerson.name, value);
          const byMother = getArrFromName(currentPerson.mother, value);
          const byFather = getArrFromName(currentPerson.father, value);

          return byName || byMother || byFather;
        }),
      });
    } else {
      this.setState({
        filtredPeople: [...people],
      });
    }
  }

  updateSortStatus = () => {
    this.setState(prevState => (
      {
        sortStatus: -prevState.sortStatus,
      }
    ));
  }

  handleSubmitForm = (person) => {
    this.setState(prevState => (
      {
        listOfPeople: [...prevState.listOfPeople, person],
        filtredPeople: [...prevState.listOfPeople, person],
        filterInput: '',
      }
    ));
  }

  render() {
    const { filtredPeople, sortStatus, listOfPeople, filterInput } = this.state;

    return (
      <div className="app">
        <h1>
          People table
          {filtredPeople.length}
        </h1>

        <input
          type="text"
          className="app__filter"
          placeholder="Enter the name for search"
          name="filterInput"
          value={filterInput}
          onChange={this.filterByNameAndParents}
        />

        <NewPerson
          people={listOfPeople}
          onSubmitForm={this.handleSubmitForm}
        />

        <PeopleTable
          people={filtredPeople}
          sortStatus={sortStatus}
          onSort={this.updateSortStatus}
        />

      </div>
    );
  }
}

export default App;
