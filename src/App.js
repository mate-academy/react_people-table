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
    peopleCopy: [],
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

  sortBy = (target) => {
    this.setState((prevState) => {
      let sortedArray;

      switch (target) {
        case 'name':
          sortedArray = [...prevState.peopleList]
            .sort((a, b) => a[target].localeCompare(b[target]));

          break;

        default: sortedArray = [...prevState.peopleList]
          .sort((a, b) => a[target] - b[target]);
      }

      return { peopleCopy: sortedArray };
    });
  }

  filter = (event) => {
    const dataToFind = event.target.value;

    this.setState((prevState) => {
      let updatedList = prevState.people;

      updatedList = updatedList.filter((item) => {
        const dataToSort = item.name + item.father + item.mother;

        return dataToSort.toLowerCase().search(
          dataToFind.toLowerCase()
        ) !== -1;
      });

      return { peopleCopy: updatedList };
    });
  }

  render() {
    return (
      <div className="app">
        <h1>
          Number of items:
          {this.state.peopleCopy.length}
        </h1>
        <form>
          <input
            type="text"
            placeholder="find person"
            onChange={this.filter}
          />
        </form>
        <PeopleTable people={this.state.peopleCopy} sortBy={this.sortByField} />
      </div>
    );
  }
}

export default App;
