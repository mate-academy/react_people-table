import React from 'react';
import PropTypes from 'prop-types';
import Person from '../person/Person';
import './peopleTable.css';

let sortedPeople = [];
let fieldOfSort = 'id';

const sortPeople = (people, field, sortWay = 1) => {
  if (people.length === 0) {
    return [];
  }

  let funcSort;

  switch (typeof people[0][field]) {
    case 'number':
    case 'boolean':
      funcSort = (a, b) => sortWay * (a[field] - b[field]);
      break;
    case 'string':
      funcSort = (a, b) => sortWay * a[field].localeCompare(b[field]);
      break;
    default: funcSort = (a, b) => 0;
  }

  return [...people].sort(funcSort);
};

const PeopleTable = ({ people, sortStatus, updateAppState }) => {
  sortedPeople = sortPeople(people, fieldOfSort, sortStatus);

  const getFildOfSort = (event) => {
    fieldOfSort = event.target.textContent.toLowerCase();
    updateAppState({ sortStatus: -sortStatus });
  };

  let prevRow = '';
  const selectRow = (event) => {
    const currentRow = event.target.parentNode;
    const rowClick = currentRow.hasAttribute('clickedRow');

    if (!rowClick) {
      currentRow.setAttribute('clickedRow', true);
      currentRow.classList.add('person--select');

      if (prevRow !== '') {
        prevRow.removeAttribute('clickedRow');
        prevRow.classList.remove('person--select');
        prevRow = currentRow;
      } else {
        prevRow = currentRow;
      }
    } else {
      currentRow.removeAttribute('clickedRow');
      currentRow.classList.remove('person--select');
    }
  };

  return (
    <table className="peopleTable">
      <thead>
        <tr>
          <th onClick={getFildOfSort} className="cursorPointer">Id</th>
          <th onClick={getFildOfSort} className="cursorPointer">Name</th>
          <th>Sex</th>
          <th onClick={getFildOfSort} className="cursorPointer">Born</th>
          <th onClick={getFildOfSort} className="cursorPointer">Died</th>
          <th onClick={getFildOfSort} className="cursorPointer">Age</th>
          <th>Mother</th>
          <th>Father</th>
          <th>Century</th>
          <th>Children</th>
        </tr>
      </thead>
      <tbody onClick={selectRow}>
        {
          sortedPeople.map(currentPerson => (
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
