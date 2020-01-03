import React from 'react';
import PropTypes from 'prop-types';
import PeopleRow from './PeopleRow';

const PeopleTable = ({ people, sortTable, highlightedValue }) => {
  let startState = [];
  let startValue = null;
  const createTableHeaders = (...args) => {
    if (args.every((arg, i) => arg === startState[i])) {
      return startValue;
    }

    const [currentPeople] = args;

    startState = args;
    if (!people.length) {
      startValue = [{ name: 'No people' }];

      return startValue;
    }

    startValue = Object.keys(currentPeople[0]).map(
      key => ({
        code: key, name: key[0].toUpperCase() + key.slice(1,),
      })
    );

    return startValue;
  };

  const tableHeaders = createTableHeaders(people);

  return (
    <table>
      <thead>
        <tr>
          {tableHeaders.map(({ name, code }) => (
            <th key={name}>
              <button
                type="button"
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
  ),
  sortTable: PropTypes.func,
  highlightedValue: PropTypes.string,
}.isRequired;

export default PeopleTable;
