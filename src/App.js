import React from 'react';
import getPeople from './getPeople';
import PeopleTable from './PeopleTable';
import './styles/app.css';

const getData = async() => {
  const peopleData = await getPeople();
  return peopleData.map((person, index) => ({
    ...person,
    id: index,
    age: person.died - person.born,
    century: Math.ceil(person.died / 100),
    children: [...getChildren(peopleData, person)],
  }));
};

const getChildren = (people, person) => {
  const children = people.filter(man => man.father === person.name
    || man.mother === person.name);
  return children.map(child => child.name).join(', ');
};

class App extends React.Component {
  people = [];

  state = {
    visiblePeople: [],
    sortField: '',
    currentSortField: '',
    currentPeople: [],
  };

  async componentDidMount() {
    this.people = await getData();
    this.setState({
      visiblePeople: [...this.people],
    });
  }

  setSortField = (sortField) => {
    const { currentSortField, currentPeople, visiblePeople } = this.state;
    if (currentSortField === sortField
      && currentPeople === visiblePeople) {
      return this.setState({
        visiblePeople: [...visiblePeople].reverse(),
        currentPeople: [...visiblePeople].reverse(),
      });
    }

    const sortPeople = [...this.people].sort((a, b) => {
      switch (typeof a[sortField]) {
        case 'string':
          return a[sortField].localeCompare(b[sortField]);
        case 'number':
        case 'boolean':
          return a[sortField] - b[sortField];
        default:
          return null;
      }
    });

    return this.setState({
      visiblePeople: sortPeople,
      sortField,
      currentSortField: sortField,
      currentPeople: sortPeople,
    });
  };

  render() {
    const { visiblePeople, sortField } = this.state;
    return (
      <main className="main">
        {(sortField !== '')
          ? (
            <h1>
              {`People sorted by ${sortField}`}
            </h1>
          ) : (
            <h1>
              {`People table with length ${visiblePeople.length}`}
            </h1>
          )
        }
        <PeopleTable
          people={visiblePeople}
          onSortFieldChange={this.setSortField}
        />
      </main>
    );
  }
}

export default App;
