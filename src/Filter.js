import React from 'react';
import PropTypes from 'prop-types';

const Filter = ({ people, handleSearch }) => {
  const search = (event) => {
    const value = event.target.value.toLowerCase();

    const result = people.filter(({ name, mother, father }) => (
      (name + mother + father).toLowerCase().includes(value)
    ));

    handleSearch(result, value);
  };

  return (
    <div className="table__sort">
      <label htmlFor="search">
        Search
        <input
          type="text"
          id="search"
          onChange={search}
          className="sort__input"
          autoComplete="off"
        />
      </label>
    </div>
  );
};

Filter.propTypes = {
  handleSearch: PropTypes.func.isRequired,
  people: PropTypes.arrayOf.isRequired,
};

export default Filter;
