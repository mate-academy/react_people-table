import React from 'react';
import PropTypes from 'prop-types';

export const PeopleTable = ({ people = [] }) => (
  <table>
    <thead>
      <tr>
        <th>Name</th>
        <th>Sex</th>
        <th>Born</th>
        <th>Died</th>
      </tr>
    </thead>

    <tbody>
      {people.map(person => (
        <tr>
          <td>{person.name}</td>
          <td>{person.sex}</td>
          <td>{person.born}</td>
          <td>{person.died || '-'}</td>
        </tr>
      ))}
    </tbody>
  </table>
);

PeopleTable.propTypes = {
  people: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      sex: PropTypes.string.isRequired,
      born: PropTypes.number.isRequired,
      died: PropTypes.number,
    }),
  ).isRequired,
};
