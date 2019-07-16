import React from 'react';
import Data from '../api/getData';
import PeopleTable from './PeopleTable';
import NewPerson from './NewPerson';

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

  onSortPeopleBy = (field) => {
    field !== this.state.sortField
      ? (this.setState(prevState => ({
        visiblePeople: prevState.visiblePeople.sort(getSortBy(field)),
        sortField: field,
      }))
      ) : (
        this.setState(prevState => ({
          visiblePeople: prevState.visiblePeople.reverse(),
        }))
      );
  }

  onSearchByName = (event) => {
    const searchField = event.target.value.toLowerCase();

    this.setState(prevState => ({
      visiblePeople: prevState.people.filter(
        person => [person.name, person.mother, person.father]
          .join('')
          .toLowerCase()
          .includes(searchField)
      ),
    }));
  };

  render() {
    const { visiblePeople, isLoaded } = this.state;
    const { onSortPeopleBy } = this;

    return (
      <div className="page ">
        <header className="text-monospace">
          <h1>
            {visiblePeople.length}
            {' '}
            People in TABLE
          </h1>
          <h6>
            ⇵ People sorted by:
            {' '}
            {this.state.sortField.toUpperCase()}
          </h6>
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
                <NewPerson people={visiblePeople} />
              </div>
            </div>
            <table className="PeopleTable table-borderless">
              <thead className="table-header text-monospace">
                <tr>
                  <th onClick={() => onSortPeopleBy('id')}>ID</th>
                  <th onClick={() => onSortPeopleBy('name')}>Name</th>
                  <th onClick={() => onSortPeopleBy('sex')}>Sex</th>
                  <th onClick={() => onSortPeopleBy('born')}>Born</th>
                  <th onClick={() => onSortPeopleBy('died')}>Died</th>
                  <th onClick={() => onSortPeopleBy('age')}>Age</th>
                  <th onClick={() => onSortPeopleBy('century')}>
                    Century
                  </th>
                  <th onClick={() => onSortPeopleBy('father')}>
                    Father
                  </th>
                  <th onClick={() => onSortPeopleBy('mother')}>
                    Mother
                  </th>
                  <th onClick={() => onSortPeopleBy('children')}>
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
          <div className="start-btn">
            <button
              className="btn btn-info btn-lg text-monospace"
              onClick={this.loadData}
              type="button"
            >
              Open TABLE
            </button>
          </div>
        )}
      </div>
    );
  }
}

export default App;
