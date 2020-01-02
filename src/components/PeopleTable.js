import React from 'react';
import PropTypes from 'prop-types';
import PeopleRow from './PeopleRow';

const PeopleTable = ({ people, sortTable, highlightedValue }) => {
  let prevArgs = [];
  let prevValue = null;
  const createTableHeaders = (...args) => {
    if (args.every((arg, i) => arg === prevArgs[i])) {
      return prevValue;
    }

    const [currentPeople] = args;

    prevArgs = args;
    if (people.length === 0) {
      prevValue = [{ name: 'There are no people' }];

      return prevValue;
    }

    prevValue = Object.keys(currentPeople[0]).map(
      key => ({
        code: key, name: key[0].toUpperCase() + key.slice(1,),
      })
    );

    return prevValue;
  };

  const tableHeaders = createTableHeaders(people);

  return (
    <table className="people-table">
      <thead>
        <tr>
          {tableHeaders.map(({ name, code }) => (
            <th key={name}>
              <button
                type="button"
                className="sort-button"
                onClick={() => sortTable(code)}
              >
                {name}
              </button>
            </th>
          ))}
        </tr>
      </thead>

      <tbody>
        {people.map(person => (
          <PeopleRow
            key={person.id}
            currentPerson={person}
            tableHeaders={tableHeaders}
            highlightedValue={highlightedValue}
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
  sortTable: PropTypes.func.isRequired,
  highlightedValue: PropTypes.string.isRequired,
};

export default PeopleTable;
