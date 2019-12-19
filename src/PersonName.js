import React from 'react';
import PropTypes from 'prop-types';

const PersonName = ({ person, tdNameClassName }) => (
  <td className={tdNameClassName(person)}>
    {person.name}
  </td>
);

PersonName.propTypes = {
  person: PropTypes.oneOfType(Object).isRequired,
  tdNameClassName: PropTypes.func.isRequired,
};
export default PersonName;
