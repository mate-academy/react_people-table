import React from 'react';
import PropTypes from 'prop-types';

const Filter = ({ toFilter }) => (
  <label>
    <span>Search</span>
    <input
      onChange={event => toFilter(event.target.value)}
      type="search"
    />
  </label>
);

Filter.propTypes = { toFilter: PropTypes.func.isRequired };

export default Filter;
