import React from 'react';
import '../peopleTable/PeopleTable.css';
import PropTypes from 'prop-types';

function TableItem({ man }) {
  return (
    <tr className="Person">
      <td>
        {man.id}
      </td>
      <td className={man.sex === 'm' ? 'Person--male' : 'Person--female'}>
        {man.sex}
      </td>
      <td className={man.born <= 1650 ? 'before1650' : null}>
        {man.name}
      </td>
      <td className={man.age >= 65 ? 'livedfor65' : null}>
        {man.age}
      </td>
      <td>
        {man.born}
      </td>
      <td>
        {man.died}
      </td>
      <td>
        {man.mother || ''}
      </td>
      <td>
        {man.father || ''}
      </td>
      <td className={`person--lived-in-${man.century}`}>
        {man.century}
      </td>
    </tr>
  );
}

TableItem.propTypes = {
  man: PropTypes.objectOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    sex: PropTypes.string.isRequired,
    born: PropTypes.number.isRequired,
    died: PropTypes.number.isRequired,
    father: PropTypes.string,
    mother: PropTypes.string,
  })).isRequired,
};

export default TableItem;
