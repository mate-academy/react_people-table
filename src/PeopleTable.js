import React from 'react';
import PropTypes from 'prop-types';
import Person from './Person';

const PeopleTable = ({
  handleSortClick,
  filteredPeople,
  selectedPerson,
  selectHandler,
}) => (
  <table className="table">
    <thead>
      <tr className="tableTitle" onClick={handleSortClick}>
        <th>id</th>
        <th>name</th>
        <th>sex</th>
        <th>born</th>
        <th>died</th>
        <th>mother</th>
        <th>father</th>
        <th>age</th>
        <th>century</th>
      </tr>
    </thead>
    <tbody>
      {filteredPeople.map(person => (
        <Person
          person={person}
          key={person.id}
          selectHandler={selectHandler}
          selectedPerson={selectedPerson}
        />
      ))}
    </tbody>
  </table>
);

PeopleTable.propTypes = {
  handleSortClick: PropTypes.func.isRequired,
  selectedPerson: PropTypes.number.isRequired,
  selectHandler: PropTypes.func.isRequired,
  filteredPeople: PropTypes.arrayOf(PropTypes.any).isRequired,
};

export default PeopleTable;
