import React from 'react';
import ClassNames from 'classnames';
import PropTypes from 'prop-types';

const Person = ({ personData, columns, highlight, match }) => (
  <tr
    onClick={() => highlight(personData.name)}
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
          highlighted: personData.name
            .toLowerCase().replace(/ /g, '-') === match,
        })}
      >
        {personData[column]}
      </td>
    ))}
  </tr>
);

Person.propTypes = {
  personData: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    mother: PropTypes.string,
    father: PropTypes.string,
    sex: PropTypes.string.isRequired,
    born: PropTypes.number.isRequired,
    died: PropTypes.number.isRequired,
    age: PropTypes.number.isRequired,
    century: PropTypes.number.isRequired,
  }).isRequired,
  match: PropTypes.string.isRequired,
  columns: PropTypes.arrayOf(PropTypes.string).isRequired,
  highlight: PropTypes.func.isRequired,
};

export default Person;
