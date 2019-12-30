import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Person from './Person';

const PeopleTable = ({ people, sort }) => {
  const [selectedPerson, setSelectedPerson] = useState(0);
  const columns = ['id', 'name', 'sex', 'born', 'died',
    'mother', 'father', 'age', 'century'];

  const highlightPerson = (id) => {
    setSelectedPerson(id);
  };

  return (
    <table className="table">
      <thead>
        <tr>
          {columns.map(column => (
            <th onClick={sort} key={column}>{column}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {people.map(person => (
          <Person
            selected={selectedPerson}
            highlight={highlightPerson}
            personData={person}
            columns={columns}
            key={person.name}
          />
        ))}
      </tbody>
    </table>
  );
};

PeopleTable.propTypes = {
  people: PropTypes.arrayOf(PropTypes.object).isRequired,
  sort: PropTypes.func.isRequired,
};

export default PeopleTable;
