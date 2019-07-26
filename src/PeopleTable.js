import React from 'react';
import PropTypes from 'prop-types';

import Person from './Person';

const PeopleTable = ({ people, sortPeople }) => (
  <table className="PeopleTable">
    <thead>
      <tr>
        <th onClick={() => sortPeople('id')}>ID</th>
        <th onClick={() => sortPeople('name')}>Name</th>
        <th onClick={() => sortPeople('sex')}>Sex</th>
        <th onClick={() => sortPeople('born')}>Born</th>
        <th onClick={() => sortPeople('died')}>Died</th>
        <th onClick={() => sortPeople('age')}>Age</th>
        <th onClick={() => sortPeople('century')}>Century</th>
        <th>Father</th>
        <th>Mother</th>
      </tr>
    </thead>
    <tbody>
      {people.map(
        person => (
          <Person
            key={person.id}
            person={person}
          />
        )
      )}
    </tbody>
  </table>
);

PeopleTable.propTypes = {
  people: PropTypes.object,
  sortPeople: PropTypes.func,
}.isRequired;

export default PeopleTable;
