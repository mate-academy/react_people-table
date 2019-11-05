import React from 'react';
import PropTypes from 'prop-types';
import './PeopleTable.css';
import Person from './Person';

function PeopleTable({ people, selectPerson, selectedPersonId }) {
  return (
    <table className="PeopleTable">
      <thead>
        <tr>
          <th>Id</th>
          <th>Name</th>
          <th>Sex</th>
          <th>Born</th>
          <th>Died</th>
          <th>Age</th>
          <th>Century</th>
          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>
      <tbody>
        {people.map(person => (
          <Person
            person={person}
            key={person.id}
            selectPerson={selectPerson}
            selectedPersonId={selectedPersonId}
          />
        ))}
      </tbody>
    </table>
  );
}

PeopleTable.propTypes = {
  people: PropTypes.arrayOf(PropTypes.object).isRequired,
  selectPerson: PropTypes.func.isRequired,
  selectedPersonId: PropTypes.number.isRequired,
};

export default PeopleTable;
