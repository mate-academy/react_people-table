import React from 'react';
import '../peopleTable/PeopleTable.css';
import PropTypes from 'prop-types';

function TableItem({ person }) {
  return (
    <tr className="Person">
      <td>
        {person.id}
      </td>
      <td className={person.sex === 'm' ? 'Person--male' : 'Person--female'}>
        {person.sex}
      </td>
      <td className={person.born <= 1650 ? 'before1650' : null}>
        {person.name}
      </td>
      <td className={person.age >= 65 ? 'livedfor65' : null}>
        {person.age}
      </td>
      <td>
        {person.born}
      </td>
      <td>
        {person.died}
      </td>
      <td>
        {person.mother || ''}
      </td>
      <td>
        {person.father || ''}
      </td>
      <td className={`person--lived-in-${person.century}`}>
        {person.century}
      </td>
    </tr>
  );
}

TableItem.propTypes = {
  person: PropTypes.objectOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    sex: PropTypes.string.isRequired,
    born: PropTypes.number.isRequired,
    died: PropTypes.number.isRequired,
    father: PropTypes.string,
    mother: PropTypes.string,
  })).isRequired,
};

export default TableItem;
