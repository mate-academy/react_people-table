import React from 'react';
import PropTypes from 'prop-types';
import Person from './person';

const PeopleTable = ({ people }) => (
  <table className="PeopleTable">
    <tr>
      <th>id</th>
      <th>name</th>
      <th>sex</th>
      <th>age</th>
      <th>born</th>
      <th>died</th>
      <th>mother</th>
      <th>father</th>
      <th>century</th>
      <th>children</th>
    </tr>
    <tbody>
      {people.map((person, index) => (
        <Person person={person} index={index} />
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
