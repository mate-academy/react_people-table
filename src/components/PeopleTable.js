import React from 'react';
import PropTypes from 'prop-types';

import PeopleRow from './PeopleRow';

const createTableHeaders = people => (
  Object.keys(people[0]).map(
    key => ({ code: key, name: key[0].toUpperCase() + key.slice(1,) })
  )
);

const PeopleTable = ({ people }) => {
  const tableHeaders = createTableHeaders(people);

  return (
    <table className="people-table">
      <thead>
        <tr>
          {tableHeaders.map(({ name }) => (
            <th key={name}>{name}</th>
          ))}
        </tr>
      </thead>

      <tbody>
        {people.map(person => (
          <PeopleRow
            key={person.id}
            currentPerson={person}
            tableHeaders={tableHeaders}
          />
        ))}
      </tbody>
    </table>
  );
};

PeopleTable.propTypes = {
  people: PropTypes.arrayOf(
    PropTypes.object
  ).isRequired,
};

export default PeopleTable;
