import React from 'react';
import PropTypes from 'prop-types';
import Person from './Person';

const PeopleTable = ({ people }) => (
  <table className="PeopleTable">

    <thead>
      <tr className="PeopleTable__thead">
        <th>Id</th>
        <th>Name</th>
        <th>Sex</th>
        <th>Born</th>
        <th>Died</th>
        <th>Mother</th>
        <th>Father</th>
      </tr>
    </thead>

    <tbody>
      {people.map((person, index) => (
        <Person
          person={person}
          index={index + 1}
          key={index}
        />
      ))}
    </tbody>

  </table>
);

PeopleTable.propTypes = {
  people: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string,
    sex: PropTypes.string,
    born: PropTypes.number,
    died: PropTypes.number,
    mother: PropTypes.string,
    father: PropTypes.string,
    map: PropTypes.func,
  })).isRequired,
};

export default PeopleTable;
