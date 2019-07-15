import React from 'react';
import PropTypes from 'prop-types';
import Person from './Person';
import './App.css';

const PeopleTable = ({ people }) => (
  <table className="PeopleTable">
    <thead>
      <tr className="PeopleTable__thead">
        <th>id</th>
        <th>name</th>
        <th>sex</th>
        <th>born</th>
        <th>died</th>
        <th>mother</th>
        <th>father</th>
        <th>age</th>
        <th>century</th>
        <th>children</th>
      </tr>
    </thead>
    <tbody>
      {people.map((person, index) => (
        <Person person={person} key={person.id} index={index} />
      ))}
    </tbody>
  </table>
);

PeopleTable.propTypes = {
  people: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default PeopleTable;
