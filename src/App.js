import React from 'react';
import './App.css';

import getData from './api/getData';
import PeopleTable from './components/PeopleTable';
import createSorterBy from './components/createSorterBy';
import NewPerson from './components/NewPerson';

class App extends React.Component {
  state = {
    people: [],
    visiblePeople: [],
    sortField: 'id',
    isVisible: false,
  }

  componentDidMount() {
    this.loadData();
  }

  loadData = async() => {
    const people = await getData();

    this.setState({
      people,
      visiblePeople: people,
    });
  };

  sortBy = (sortField) => {
    this.setState({
      sortField,
    });
    this.setState(prevState => ({
      visiblePeople: createSorterBy(prevState),
    }));
  };

  handleFilter = (event) => {
    const { value } = event.target;

    this.setState(prevState => ({
      visiblePeople: prevState.people.filter(
        person => ((
          person.name
            .toLowerCase()
            .includes(value
              .toLowerCase()
              .trim())
        ) || (
          person.mother === null || person.mother === ''
            ? 0
            : person.mother
              .toLowerCase()
              .includes(value
                .toLowerCase()
                .trim())
        ) || (
          person.father === null || person.father === ''
            ? 0
            : person.father
              .toLowerCase()
              .includes(value
                .toLowerCase()
                .trim())
        ))
      ),
    }));
  }

  toggleForm = () => {
    this.setState(prevState => ({
      isVisible: !prevState.isVisible,
    }));
  }

  addNewPerson = (person) => {
    this.setState((prevState) => {
      const people = [...prevState.people, person];

      return {
        people,
        visiblePeople: people,
      };
    });
  }

  render() {
    const { visiblePeople, isVisible } = this.state;

    return (
      <div className="App">
        <h1>People table</h1>

        <div className="sort-buttons">
          <h2>
            Sort by:
          </h2>

          <button
            type="button"
            onClick={() => this.sortBy('id')}
            className="sort-buttons__btn"
          >
            ID
          </button>

          <button
            type="button"
            onClick={() => this.sortBy('name')}
            className="sort-buttons__btn"
          >
            Name
          </button>

          <button
            type="button"
            onClick={() => this.sortBy('age')}
            className="sort-buttons__btn"
          >
            Age
          </button>

          <button
            type="button"
            onClick={() => this.sortBy('born')}
            className="sort-buttons__btn"
          >
            Year of birth
          </button>

          <button
            type="button"
            onClick={() => this.sortBy('died')}
            className="sort-buttons__btn"
          >
            Year of death
          </button>
        </div>

        <div className="filter-input">
          <label htmlFor="name-input">
            Filter:
            <input
              className="filter-input__input"
              type="text"
              id="name-input"
              onChange={this.handleFilter}
            />
          </label>
        </div>

        { isVisible ? (
          <>
            <NewPerson
              peopleAmmount={visiblePeople.length}
              onSubmit={this.addNewPerson}
            />

            <div className="toggle-btn">
              <button
                type="button"
                onClick={this.toggleForm}
                className="toggle-btn"
              >
                Hide form
              </button>
            </div>

          </>
        ) : (
          <div className="toggle-btn">
            <button
              type="button"
              onClick={this.toggleForm}
              className="toggle-btn"
            >
              Add new person
            </button>
          </div>
        )
        }

        <PeopleTable people={visiblePeople} />
      </div>
    );
  }
}

export default App;
