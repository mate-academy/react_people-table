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
      sort: 'asc',
    };

    this.handleFilter = this.handleFilter.bind(this);
  }

  handleFilter = (event) => {
    const text = event.target.value.trim();

    const filteredList = [...this.people]
      .filter(item => (item.name.toLowerCase()
        .search(text.toLowerCase()) !== -1)
      && ((item.mother)
        ? item.mother.toLowerCase()
          .search(text.toLowerCase()) !== -1
        : 1)
      && ((item.father)
        ? item.father.toLowerCase()
          .search(text.toLowerCase()) !== -1
        : 1));

    this.setState({ peopleList: filteredList });
  };

  getSortedData = (event) => {
    const sortingBy = event.target.valueOf().textContent.toLowerCase();
    const { sort } = this.state;

    if (sort === 'desc') {
      this.setState(prevState => ({
        peopleList: [...prevState.peopleList]
          .sort((a, b) => a[sortingBy] - b[sortingBy]),
        sort: 'asc',
      }
      ));
    }

    if (sort === 'asc') {
      this.setState(prevState => ({
        peopleList: [...prevState.peopleList]
          .sort((a, b) => b[sortingBy] - a[sortingBy]),
        sort: 'desc',
      }
      ));
    }

    if (((sortingBy === 'sex') && (sort === 'desc'))
      || ((sortingBy === 'name') && (sort === 'desc'))) {
      this.setState(prevState => ({
        peopleList: [...prevState.peopleList]
          .sort((a, b) => a[sortingBy].localeCompare(b[sortingBy])),
        sort: 'asc',
      }
      ));
    }

    if (((sortingBy === 'sex') && (sort === 'asc'))
      || ((sortingBy === 'name') && (sort === 'asc'))) {
      this.setState(prevState => ({
        peopleList: [...prevState.peopleList]
          .sort((a, b) => b[sortingBy].localeCompare(a[sortingBy])),
        sort: 'desc',
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
