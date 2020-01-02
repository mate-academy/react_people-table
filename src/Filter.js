import React from 'react';
import PropTypes from 'prop-types';

const Filter = ({ handleSearch }) => (
  <div className="table__sort">
    <label htmlFor="search">
      Search
      <input
        type="text"
        id="search"
        onChange={handleSearch}
        className="sort__input"
        autoComplete="off"
      />
    </label>
  </div>
);

Filter.propTypes = { handleSearch: PropTypes.func.isRequired };

export default Filter;
