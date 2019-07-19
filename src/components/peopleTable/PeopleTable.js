import React from 'react';
import PropTypes from 'prop-types';
import Person from '../person/Person';
import './peopleTable.css';

const sortPeople = (people, field, sortWay = 1) => {
  if (people.length === 0) {
    return [];
  }

  let funcSort;

  switch (typeof people[0][field]) {
    case 'number':
    case 'boolean':
      funcSort = (a, b) => sortWay * (a[field] - b[field]);
      break;
    case 'string':
      funcSort = (a, b) => sortWay * a[field].localeCompare(b[field]);
      break;
    default: funcSort = (a, b) => 0;
  }

  return [...people].sort(funcSort);
};

class PeopleTable extends React.Component {
  state = {
    selectPerson: '',
    fieldOfSort: 'id',
  }

  getFildOfSort = (event) => {
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
    const sortedPeople = sortPeople(people, fieldOfSort, sortStatus);

    return (
      <table className="peopleTable">
        <thead>
          <tr>
            <th onClick={this.getFildOfSort} className="cursorPointer">Id</th>
            <th onClick={this.getFildOfSort} className="cursorPointer">Name</th>
            <th>Sex</th>
            <th onClick={this.getFildOfSort} className="cursorPointer">Born</th>
            <th onClick={this.getFildOfSort} className="cursorPointer">Died</th>
            <th onClick={this.getFildOfSort} className="cursorPointer">Age</th>
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
