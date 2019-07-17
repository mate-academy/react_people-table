import React from 'react';
import PeopleTable from './components/PeopleTable';
import getPeople from './data/dataPeople';
import AddPerson from './components/AddPerson';
import './App.css';

const sortPeople = ({ field, people, direction }) => {
  const sortedData = [...people];
  sortedData.sort((a, b) => {
    switch (typeof a[field]) {
      case 'string':
        return direction * (a[field].localeCompare(b[field]));

      case 'number':
      case 'boolean':
        return direction * (a[field] - b[field]);

      default:
        return 0;
    }
  });

  return sortedData;
};
class App extends React.Component {
  state = {
    people: [],
    visiblePeople: [],
    direction: 1,
  };

  componentDidMount() {
    this.loadData();
  }

  loadData = async() => {
    const people = await getPeople();
    this.setState({
      visiblePeople: people,
      people: people.map((person, index) => ({
        ...person,
        id: index + 1,
        age: person.died - person.born,
        century: Math.ceil(person.died / 100),
        children: people
          .filter(child => child.father === person.name
              || child.mother === person.name)
          .map(human => human.name)
          .join(', '),
      })),
    });
  };

  sortingBy = (field) => {
    this.setState({
      field,
    });
    this.setState(state => ({
      people: sortPeople(state),
      direction: state.direction === 1 ? -1 : 1,
    }));
  };

  handleSearch = (event) => {
    const search = event.target.value;
    this.setState(prevState => ({
      people: prevState.people
        .filter(person => [person.name, person.mother, person.father]
          .join('')
          .toLowerCase()
          .indexOf(search.toLowerCase()) !== -1),
    }));
  };

  render() {
    const { people } = this.state;

    return (
      <>
        <h1 className="people__title">
          People: {people.length}
        </h1>
        <form className="form-horizontal">
          <input
            placeholder="Search..."
            onChange={this.handleSearch}
            className="form-control mb-4"
          />
        </form>
        <AddPerson />
        <table className="PeopleTable table">
          <thead>
            <tr>
              <th onClick={() => this.sortingBy('id')}>
                id:
              </th>
              <th onClick={() => this.sortingBy('name')}>
                name:
                <i className="fas fa-user" />
              </th>
              <th onClick={() => this.sortingBy('sex')}>
                sex:
                <i className="fas fa-venus-mars" />
              </th>
              <th onClick={() => this.sortingBy('born')}>
                born:
              </th>
              <th onClick={() => this.sortingBy('died')}>
                died:
              </th>
              <th onClick={() => this.sortingBy('mother')}>
                mother:
                <i className="fas fa-female" />
              </th>
              <th onClick={() => this.sortingBy('father')}>
                father:
                <i className="fas fa-male" />
              </th>
              <th onClick={() => this.sortingBy('age')}>
                age:
                <i className="fas fa-user-clock" />
              </th>
              <th onClick={() => this.sortingBy('century')}>
                century:
              </th>
              <th onClick={() => this.sortingBy('children')}>
                children:
              </th>
            </tr>
          </thead>
          <PeopleTable people={people} />
        </table>
      </>
    );
  }
}

export default App;
