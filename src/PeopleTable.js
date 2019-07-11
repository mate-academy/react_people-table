import React from 'react';
import PropTypes from 'prop-types';
import Person from './Person';
import './App.css';

const PeopleTable = ({ peoples }) => (
  <table className="PeopleTable">
    <tr>
      <th>id</th>
      <th>name</th>
      <th className="person--male">sex</th>
      <th>born</th>
      <th>died</th>
      <th>mother</th>
      <th>father</th>
    </tr>
    <tbody>
      {peoples.map((person, index) => (
        <Person person={person} i={index} />
      ))}
    </tbody>
  </table>
);

PeopleTable.propTypes = {
  peoples: PropTypes.arrayOf(PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ])).isRequired,
};
export default PeopleTable;
