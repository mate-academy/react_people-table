import React from 'react';
import ClassNames from 'classnames';
import PropTypes from 'prop-types';

const Person = ({ personData, columns, selected, highlight }) => (
  <tr
    onClick={() => highlight(personData.id)}
    className={ClassNames(
      personData.sex === 'm' ? 'man' : 'woman',
      `Person--lived-in-${personData.century}`,
    )}
  >
    {columns.map(column => (
      <td
        key={column}
        className={ClassNames({
          'born-before-1650': column === 'name' && personData.born < 1650,
          'lived-more-65': column === 'age' && personData.age >= 65,
          highlighted: selected === personData.id,
        })}
      >
        {personData[column]}
      </td>
    ))}
  </tr>
);

Person.propTypes = {
  personData: PropTypes.objectOf.isRequired,
  columns: PropTypes.arrayOf(PropTypes.string).isRequired,
  selected: PropTypes.number.isRequired,
  highlight: PropTypes.func.isRequired,
};

export default Person;
