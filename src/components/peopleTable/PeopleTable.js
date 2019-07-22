import React from 'react';
import PropTypes from 'prop-types';
import Person from '../person/Person';
import './peopleTable.css';

const getSortFunc = (people, field, sortWay = 1) => {
  if (people.length === 0) {
    return (a, b) => 0;
  }

  switch (typeof people[0][field]) {
    case 'number':
    case 'boolean':
      return (a, b) => sortWay * (a[field] - b[field]);
    case 'string':
      return (a, b) => sortWay * a[field].localeCompare(b[field]);
    default: return (a, b) => 0;
  }
};

class PeopleTable extends React.Component {
  state = {
    selectPerson: '',
    fieldOfSort: 'id',
  }

  getFieldOfSort = (event) => {
    this.setState({
      fieldOfSort: event.target.textContent.toLowerCase(),
    });

    this.props.onSort();
  };

  handleClickRow = (id) => {
    this.setState({
      selectPerson: id,
    });
  }

  render() {
    const { selectPerson, fieldOfSort } = this.state;
    const { people, sortStatus } = this.props;
    const sortedPeople = [...people].sort(getSortFunc(people, fieldOfSort, sortStatus));

    return (
      <table className="peopleTable">
        <thead>
          <tr>
            <th onClick={this.getFieldOfSort} className="cursorPointer">Id</th>
            <th onClick={this.getFieldOfSort} className="cursorPointer">Name</th>
            <th>Sex</th>
            <th onClick={this.getFieldOfSort} className="cursorPointer">Born</th>
            <th onClick={this.getFieldOfSort} className="cursorPointer">Died</th>
            <th onClick={this.getFieldOfSort} className="cursorPointer">Age</th>
            <th>Mother</th>
            <th>Father</th>
            <th>Century</th>
            <th>Children</th>
          </tr>
        </thead>
        <tbody>
          {
            sortedPeople.map(currentPerson => (
              <Person
                person={currentPerson}
                onClickRow={this.handleClickRow}
                selectPerson={selectPerson}
                key={`key${currentPerson.id + 10}`}
              />
            ))
          }
        </tbody>
      </table>
    );
  }
}

PeopleTable.propTypes = {
  people: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    born: PropTypes.number,
    died: PropTypes.number,
    age: PropTypes.number,
  })).isRequired,
  sortStatus: PropTypes.number.isRequired,
  onSort: PropTypes.func.isRequired,
};

export default PeopleTable;
