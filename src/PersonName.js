import React from 'react';
import PropTypes from 'prop-types';

const PersonName = ({ name, sex }) => (
  <span className={sex === 'm' ? 'person--man' : 'person--woman'}>
    {name}
  </span>
);

PersonName.propTypes = {
  name: PropTypes.string,
  sex: PropTypes.string.isRequired,
};

PersonName.defaultProps = {
  name: '',
};

export default PersonName;
