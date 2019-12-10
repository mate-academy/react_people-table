import React from 'react';
import PropTypes from 'prop-types';

const makePersonsClassName = (person, columnName) => {
  let className = 'person';

  className += person.sex === 'm' ? ' person--male' : ' person--female';

  if (columnName === 'name') {
    return person.born < 1650 ? 'person--born-before-1650' : null;
  }

  if (columnName === 'age') {
    return person.age >= 65 ? 'person--age-over-65' : null;
  }

  className += ` person--lived-in-${person.century}`;

  return !columnName ? className : null;
};

const PeopleRow = ({ currentPerson, tableHeaders }) => (
  <tr className={makePersonsClassName(currentPerson)}>
    {tableHeaders.map(({ code }) => (
      <td
        key={code}
        className={makePersonsClassName(currentPerson, code)}
      >
        {currentPerson[code]}
      </td>
    ))}
  </tr>
);

PeopleRow.propTypes = {
  currentPerson: PropTypes.objectOf(
    PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ])
  ).isRequired,
  tableHeaders: PropTypes.arrayOf(
    PropTypes.objectOf(
      PropTypes.string
    )
  ).isRequired,
};

export default PeopleRow;
