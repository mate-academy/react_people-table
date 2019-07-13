import React from 'react';
import PropTypes from 'prop-types';
import Person from './Person';
import './peopleTable.css';

let sortPeople = [];
let fieldOfSort = 'id';

const isSorted = (people, sortWay, fieldOfSort) => {
  if (people.length === 0) {
    return [];
  }

  let funcSort;

  switch (typeof people[0][fieldOfSort]) {
    case 'number':
      funcSort = (a, b) => sortWay * (a[fieldOfSort] - b[fieldOfSort]);
      break;
    case 'string':
      funcSort = (a, b) => sortWay * a[fieldOfSort].localeCompare(b[fieldOfSort]);
      break;
    default: funcSort = 0;
  }

  return [...people].sort(funcSort);
};

const PeopleTable = ({ people, sortStatus, updateAppState }) => {
  sortPeople = isSorted(people, sortStatus, fieldOfSort);

  const getFildOfSort = (event) => {
    fieldOfSort = event.target.textContent.toLowerCase();
    updateAppState({ sortStatus: -sortStatus });
  };

  const cursorPointer = { cursor: 'pointer' };

  return (
    <table className="peopleTable">
      <thead>
        <tr>
          <th onClick={getFildOfSort} style={cursorPointer}>Id</th>
          <th onClick={getFildOfSort} style={cursorPointer}>Name</th>
          <th>Sex</th>
          <th onClick={getFildOfSort} style={cursorPointer}>Born</th>
          <th onClick={getFildOfSort} style={cursorPointer}>Died</th>
          <th onClick={getFildOfSort} style={cursorPointer}>Age</th>
          <th>Mother</th>
          <th>Father</th>
          <th>Century</th>
          <th>Children</th>
        </tr>
      </thead>
      <tbody>
        {
          sortPeople.map(currentPerson => (
            <Person
              {...currentPerson}
              key={`key${currentPerson.id + 10}`}
            />
          ))
        }
      </tbody>
    </table>
  );
};

PeopleTable.propTypes = {
  people: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    born: PropTypes.number,
    died: PropTypes.number,
    age: PropTypes.number,
  })).isRequired,
  sortStatus: PropTypes.number.isRequired,
  updateAppState: PropTypes.func.isRequired,
};

export default PeopleTable;
