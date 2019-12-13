import React from 'react';
import PropTypes from 'prop-types';
import ClassNames from 'classnames';

const PeopleRow = (
  { currentPerson, tableHeaders, highLightPerson, selectedPerson }
) => {
  const { born, age, sex, century, id } = currentPerson;

  return (
    <tr
      className={ClassNames(
        'person',
        sex === 'm' ? 'person--male' : 'person--female',
        `person--lived-in-${century}`,
        { 'person--selected': selectedPerson === id },
      )}
      onClick={() => highLightPerson(id)}
    >
      {tableHeaders.map(({ code }) => (
        <td
          key={code}
          className={ClassNames({
            'person--born-before-1650': code === 'name' && born < 1650,
            'person--age-over-65': code === 'age' && age >= 65,
          })}
        >
          {currentPerson[code]}
        </td>
      ))}
    </tr>
  );
};

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
  highLightPerson: PropTypes.func.isRequired,
  selectedPerson: PropTypes.number.isRequired,
};

export default PeopleRow;
