import React from 'react';
import PropTypes from 'prop-types';

const Sort = ({ handleSort, title }) => (
  <th
    onClick={() => handleSort(title)}
    className="column-header"
  >
    {title}
  </th>
);

Sort.propTypes = {
  handleSort: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
};

export default Sort;
