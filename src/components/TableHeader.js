import React from 'react';
import PropTypes from 'prop-types';
import './TableHeader.css';

const TableHeader = props => (
  <thead>
    <tr>
      <th
        onClick={() => props.handleSort('id')}
        className="sorting--cell"
      >
        id ↓↑
      </th>
      <th
        onClick={() => props.handleSort('name')}
        className="sorting--cell"
      >
        name ↓↑
      </th>
      <th
        onClick={() => props.handleSort('sex')}
        className="sorting--cell"
      >
        sex ↓↑
      </th>
      <th
        onClick={() => props.handleSort('born')}
        className="sorting--cell"
      >
        born ↓↑
      </th>
      <th
        onClick={() => props.handleSort('died')}
        className="sorting--cell"
      >
        died ↓↑
      </th>
      <th>father</th>
      <th>mother</th>
      <th
        onClick={() => props.handleSort('age')}
        className="sorting--cell"
      >
        age ↓↑
      </th>
      <th
        onClick={() => props.handleSort('century')}
        className="sorting--cell"
      >
        century ↓↑
      </th>
      <th>children</th>
    </tr>
  </thead>
);

TableHeader.propTypes = {
  handleSort: PropTypes.func.isRequired,
};

export default TableHeader;
