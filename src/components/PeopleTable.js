import React from 'react';
import PropTypes from 'prop-types';

import PersonInfo from './PersonInfo';

const PeopleTable = ({ people }) => (
  <table className="people-table">
    <thead>
      <tr>
        <th>ID</th>
        <th>Name</th>
        <th>Sex</th>
        <th>Born</th>
        <th>Died</th>
        <th>Age</th>
        <th>Mother</th>
        <th>Father</th>
        <th>Children</th>
      </tr>
    </thead>
    <tbody>
      {people.map(person => (
        <PersonInfo person={person} key={people.id} />
      ))}
    </tbody>
  </table>
);

PeopleTable.propTypes = {
  people: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default PeopleTable;
