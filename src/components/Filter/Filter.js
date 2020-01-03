import React from 'react';
import PropTypes from 'prop-types';

const Filter = props => (
  <input type="text" onChange={props.onFilterChanged} />
);

Filter.defaultProps = {
  onFilterChanged: {},
};

Filter.propTypes = {
  onFilterChanged: PropTypes.func,
};

export default Filter;
