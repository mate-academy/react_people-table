import React from 'react';
import PropTypes from 'prop-types';

const Sort = ({ toSort, title }) => (
  <th
    onClick={() => toSort(title)}
    className="column-header"
  >
    {title}
  </th>
);

Sort.propTypes = {
  toSort: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
};

export default Sort;
