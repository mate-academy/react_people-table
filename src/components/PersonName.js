import React from 'react';
import PropTypes from 'prop-types';

const PersonName = ({ nameClass, name }) => (
  <td className={nameClass}>{name}</td>
);

PersonName.propTypes = {
  nameClass: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};

export default PersonName;
