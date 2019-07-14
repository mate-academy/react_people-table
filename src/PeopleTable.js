import React from 'react';
import PropTypes from 'prop-types';

import Person from './Person';
import './person.css';

const PeopleTable = ({ listOfPersons }) => (
  <div>
    <table className="people__table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Sex</th>
          <th>Born</th>
          <th>Died</th>
          <th>Century</th>
          <th>Age</th>
          <th>Mother</th>
          <th>Father</th>
          <th>Children</th>
        </tr>
      </thead>

      <tbody>
        {listOfPersons.map((element, index) => (
          <Person person={element} index={index} key={element.id} />
        ))}
      </tbody>
    </table>
  </div>
);

PeopleTable.propTypes = {
  listOfPersons: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default PeopleTable;
