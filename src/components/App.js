import React from 'react';
import Data from '../api/getData';
import PeopleTable from './PeopleTable';

import '../style.css';

const getData = async() => {
  const people = await Data();

  return people.map((person, index) => ({
    ...person,
    id: index + 1,
    age: person.died - person.born,
    century: Math.ceil(person.died / 100),
    children: people
      .filter(child => (
        child.father === person.name || child.mother === person.name
      ))
      .map(child => child.name)
      .join(', '),
  }));
};

const getSortBy = field => (a, b) => {
  switch (typeof a[field]) {
    case 'string':
      return a[field].localeCompare(b[field]);

    case 'number':
    case 'boolean':
      return (a[field] - b[field]);

    default:
      return 0;
  }
};

class App extends React.Component {
  state = {
    people: [],
    visiblePeople: [],
    isLoaded: false,
    sortField: '',

  };

  loadData = async() => {
    const people = await getData();

    this.setState({
      people,
      visiblePeople: [...people],
      isLoaded: true,
    });
  };

  onReverseTable = () => {
    this.setState(prevState => ({
      visiblePeople: prevState.visiblePeople.reverse(),
    }));
  };

  onSortPeopleBy = (field) => {
    field !== this.state.sortField
      ? this.setState(prevState => ({
        visiblePeople: prevState.visiblePeople.sort(getSortBy(field)),
        sortField: field,
      }))
      : this.onReverseTable();
  }

  onSearchByName = (event) => {
    const searchField = event.target.value;
    this.setState(prevState => ({
      visiblePeople: prevState.people.filter(
        person => (
          [person.name, person.mother, person.father]
            .join('')
            .toLowerCase()
            .includes(searchField.toLowerCase())
        )
      ),
    }));
  };

  render() {
    const { visiblePeople, isLoaded } = this.state;
    return (
      <div className="page ">
        <header className="text-monospace">
          <h1>
            {visiblePeople.length}
            {' '}
            People in TABLE
          </h1>
        </header>

        {isLoaded ? (
          <>
            <div className="filter-box">
              <label className="filter" htmlFor="search">
                <input
                  className="form-control filter-input text-monospace"
                  id="search"
                  type="text"
                  placeholder=" start search by name"
                  onChange={this.onSearchByName}
                />
              </label>
              <div className="add-btn">
                <button
                  className="btn btn-outline-info text-monospace"
                  onClick={this.addNewPerson}
                  type="button"
                >
                  ✚ Add person
                </button>
              </div>
            </div>
            <table className="PeopleTable table-borderless">
              <thead className="table-header text-monospace">
                <tr>
                  <th onClick={() => this.onSortPeopleBy('id')}>ID</th>
                  <th onClick={() => this.onSortPeopleBy('name')}>Name</th>
                  <th onClick={() => this.onSortPeopleBy('sex')}>Sex</th>
                  <th onClick={() => this.onSortPeopleBy('born')}>Born</th>
                  <th onClick={() => this.onSortPeopleBy('died')}>Died</th>
                  <th onClick={() => this.onSortPeopleBy('age')}>Age</th>
                  <th onClick={() => this.onSortPeopleBy('century')}>
                    Century
                  </th>
                  <th onClick={() => this.onSortPeopleBy('father')}>
                    Father
                  </th>
                  <th onClick={() => this.onSortPeopleBy('mother')}>
                    Mother
                  </th>
                  <th onClick={() => this.onSortPeopleBy('children')}>
                    Children
                  </th>
                </tr>
              </thead>
              <tbody className="font-weight-light">
                <PeopleTable people={visiblePeople} />
              </tbody>
            </table>
          </>
        ) : (
          <button
            className="btn btn-info btn-lg start-btn text-monospace"
            onClick={this.loadData}
            type="button"
          >
            Open TABLE
          </button>
        )}
      </div>
    );
  }
}

export default App;
