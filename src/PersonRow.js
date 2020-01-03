import React, { memo } from 'react';
import cn from 'classnames';
import PropTypes from 'prop-types';

const PersonRow = ({ selected, selectRow, headers, person }) => {
  const { id, sex, born, age, century } = person;

  return (
    <tr
      className={
        cn(
          'person',
          `person person--lived-in-${century}`,
          sex === 'm' ? 'person--male' : 'person--female',
          { 'person--selected': selected }
        )}
      onClick={() => selectRow(id)}
    >
      {headers.map(header => (
        <td
          key={header.code}
          className={
            cn(
              { person__bornBefore1650: header.code === 'name' && born < 1650 },
              { person__after65: header.code === 'age' && age >= 65 }
            )
          }
        >
          {person[header.code]}
        </td>
      ))}
    </tr>
  );
};

PersonRow.propTypes = {
  person: PropTypes.shape({
    id: PropTypes.number,
    sex: PropTypes.string,
    born: PropTypes.number,
    age: PropTypes.number,
    century: PropTypes.number,
  }).isRequired,
  selected: PropTypes.bool.isRequired,
  selectRow: PropTypes.func.isRequired,
  headers: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default memo(PersonRow);
