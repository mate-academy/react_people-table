import React from 'react';
import PropTypes from 'prop-types';

const TableHeader = props => (
  <thead>
    <tr>
      <th onClick={() => props.handleSort('id')}>id</th>
      <th onClick={() => props.handleSort('name')}>name</th>
      <th>sex</th>
      <th onClick={() => props.handleSort('born')}>born</th>
      <th onClick={() => props.handleSort('died')}>died</th>
      <th>father</th>
      <th>mother</th>
      <th onClick={() => props.handleSort('age')}>age</th>
      <th>century</th>
      <th>children</th>
    </tr>
  </thead>
);

TableHeader.propTypes = {
  handleSort: PropTypes.func.isRequired,
};

export default TableHeader;
