import React from 'react';
import PropTypes from 'prop-types';
import Person from './Person';
import './App.css';

class PeopleTable extends React.Component {
  columnNames = [
    'id',
    'name',
    'sex',
    'born',
    'died',
    'age',
    'century',
    'father',
    'mother',
    'children'];

  state = {
    selectedPerson: null,
  }

  markByClick = (personId) => {
    this.setState({
      selectedPerson: personId,
    });
  };

  render() {
    const { people } = this.props;
    const { selectedPerson } = this.state;
    return (
      <table className="PeopleTable">
        <thead>
          <tr className="thead">
            {this.columnNames.map(columnName => (
              <th key={columnName}>{columnName}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {people.map(person => (
            <Person
              key={person.id}
              person={person}
              selectedPerson={selectedPerson}
              markByClick={this.markByClick}
            />
          ))}
        </tbody>
      </table>
    );
  }
}

PeopleTable.propTypes = {
  people: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default PeopleTable;
