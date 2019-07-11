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
      .filter(
        child => child.father === person.name || child.mother === person.name
      )
      .map(child => child.name)
      .join(", "),
  }));
};

const getSortBy = field => (a, b) => {
  switch (typeof a[field]) {
    case "string":
      return a[field].localeCompare(b[field]);

    case "number":
    case "boolean":
      return a[field] - b[field];

    default:
      return 0;
  }
};

class App extends React.Component {
  state = {
    people: [],
    sortedPeople: [],
    isLoaded: false
  };

  loadData = async () => {
    const people = await getData();

    this.setState({
      people,
      sortedPeople: [],
      isLoaded: true
    });
  };

  reverseClick = () => {
    this.setState(prevState => ({
      people: prevState.people.reverse()
    }));
  };

  idClick = () => {
    this.setState(prevState => ({
      people: prevState.people.sort(getSortBy("id"))
    }));
  };

  ageClick = () => {
    this.setState(prevState => ({
      people: prevState.people.sort(getSortBy("age"))
    }));
  };

  bornClick = () => {
    this.setState(prevState => ({
      people: prevState.people.sort(getSortBy("born"))
    }));
  };

  diedClick = () => {
    this.setState(prevState => ({
      people: prevState.people.sort(getSortBy("died"))
    }));
  };

  centuryClick = () => {
    this.setState(prevState => ({
      people: prevState.people.sort(getSortBy("century"))
    }));
  };

  nameClick = () => {
    this.setState(prevState => ({
      people: prevState.people.sort(getSortBy("name"))
    }));
  };

  childrenClick = () => {
    this.setState(prevState => ({
      people: prevState.people.sort(getSortBy("children"))
    }));
  };

  motherClick = () => {
    this.setState(prevState => ({
      people: prevState.people.sort(getSortBy("mother"))
    }));
  };

  fatherClick = () => {
    this.setState(prevState => ({
      people: prevState.people.sort(getSortBy("father"))
    }));
  };

  sexClick = () => {
    this.setState(prevState => ({
      people: prevState.people.sort(getSortBy("sex"))
    }));
  };

  addNewPerson = () => {

  };

  render() {
    const { people, isLoaded } = this.state;
    return (
      <>
        <header>
          <h1>{people.length} People in TABLE</h1>
        </header>

        {isLoaded ? (
          <>
            <div className="filter-box">
              <div className="reverse-btn">
                <button onClick={this.reverseClick} type="button">
                  reverse table ⇅
                </button>
              </div>
              <label className="filter">
                <input
                  className="filter-input"
                  type="text"
                  placeholder=" start search by name"
                />
              </label>
              <div className="add-btn">
                <button onClick={this.addNewPerson} type="button">
                  ✚ Add person
                </button>
              </div>
            </div>
            <table className="PeopleTable">
              <thead className="table-header">
                <tr>
                  <th onClick={this.idClick}>ID</th>
                  <th onClick={this.nameClick}>Name</th>
                  <th onClick={this.sexClick}>Sex</th>
                  <th onClick={this.bornClick}>Born</th>
                  <th onClick={this.diedClick}>Died</th>
                  <th onClick={this.ageClick}>Age</th>
                  <th onClick={this.centuryClick}>Century</th>
                  <th onClick={this.fatherClick}>Father</th>
                  <th onClick={this.motherClick}>Mother</th>
                  <th onClick={this.childrenClick}>Children</th>
                </tr>
              </thead>
              <tbody>
                <PeopleTable people={people} />
              </tbody>
            </table>
          </>
        ) : (
          <button
            className="start-btn"
            onClick={this.loadData}
            type="button"
          >
            Open TABLE
          </button>
        )}
      </>
    );
  }
}

export default App;
