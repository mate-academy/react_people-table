import React from 'react';
import PropTypes from 'prop-types';
import Person from './Person';

const PeopleTable = ({ people, sortBy, getSelect, getClassNameOfPerson }) => (
  <table className="PeopleTable">
    <tr>
      <th onClick={() => sortBy('id')}>id</th>
      <th onClick={() => sortBy('name')}>name</th>
      <th>sex</th>
      <th onClick={() => sortBy('age')}>age</th>
      <th onClick={() => sortBy('born')}>born</th>
      <th onClick={() => sortBy('died')}>died</th>
      <th>mother</th>
      <th>father</th>
      <th>century</th>
      <th>children</th>
    </tr>
    <tbody>
      {people.map((person, index) => (
        <Person
          person={person}
          getSelect={getSelect}
          getClassNameOfPerson={getClassNameOfPerson}
        />
      ))}
    </tbody>
  </table>
);

PeopleTable.propTypes = {
  people: PropTypes.arrayOf(PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ])).isRequired,
};

export default PeopleTable;
