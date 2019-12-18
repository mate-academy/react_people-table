import React from 'react';
import PropTypes from 'prop-types';
import Person from './Person';

class PeopleTable extends React.Component {
  constructor({ people }) {
    super(people);
    this.people = people;

    this.state = {
      peopleList: [...this.people],
      personSelected: 0,
      sortedField: 'id',
    };

    this.handleFilter = this.handleFilter.bind(this);
  }

  handleFilter = (event) => {
    const text = event.target.value.trim().toLowerCase();

    const filteredList = [...this.people]
      .filter(item => (item.name.toLowerCase()
        .match(text.toLowerCase()))
      || ((item.mother !== null)
        ? (item.mother.toLowerCase()
          .match(text.toLowerCase()))
        : 1)
      || ((item.father !== null)
        ? (item.father.toLowerCase()
          .match(text.toLowerCase()))
        : 1));

    this.setState({ peopleList: filteredList
      .filter(item => item.mother && item.father) });
  };

  getSortedData = (event) => {
    const sortingBy = event.target.valueOf().textContent.toLowerCase();
    const { sortedField } = this.state;

    if (sortedField === sortingBy) {
      this.setState(prevState => ({
        peopleList: [...prevState.peopleList]
          .reverse(),
        sortedField: sortingBy,
      }
      ));
    } else {
      this.setState(prevState => ({
        peopleList: [...prevState.peopleList]
          .sort((a, b) => a[sortingBy] - b[sortingBy]),
        sortedField: sortingBy,
      }
      ));
    }

    if (((sortingBy === 'sex') && (sortedField !== sortingBy))
      || ((sortingBy === 'name') && (sortedField !== sortingBy))) {
      this.setState(prevState => ({
        peopleList: [...prevState.peopleList]
          .sort((a, b) => a[sortingBy].localeCompare(b[sortingBy])),
        sortedField: sortingBy,
      }
      ));
    } else if ((((sortingBy === 'sex') && (sortedField === sortingBy))
      || ((sortingBy === 'name') && (sortedField === sortingBy)))) {
      this.setState(prevState => ({
        peopleList: [...prevState.peopleList]
          .sort((a, b) => b[sortingBy].localeCompare(a[sortingBy])),
        sortedField: sortingBy,
      }
      ));
    }
  };

  clickHandler = id => (
    this.setState({ personSelected: id })
  );

  render() {
    const { personSelected, peopleList } = this.state;

    return (
      <>
        <input
          type="text"
          placeholder="Search"
          onChange={this.handleFilter}
        />
        <table className="PeopleTable">
          <thead>
            <tr>
              <th onClick={this.getSortedData}>Id</th>
              <th onClick={this.getSortedData}>Name</th>
              <th onClick={this.getSortedData}>Sex</th>
              <th onClick={this.getSortedData}>Born</th>
              <th onClick={this.getSortedData}>Died</th>
              <th>Mother</th>
              <th>Father</th>
              <th onClick={this.getSortedData}>Age</th>
              <th onClick={this.getSortedData}>Century</th>
            </tr>
          </thead>
          <tbody>
            {peopleList.map(person => (
              <Person
                person={person}
                key={person.name}
                clickHandler={this.clickHandler}
                personSelected={personSelected}
              />
            ))}
          </tbody>
        </table>
      </>
    );
  }
}

PeopleTable.propTypes = {
  people: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired,
};

export default PeopleTable;
