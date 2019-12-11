import React from 'react';
import PropTypes from 'prop-types';

const Filter = (props) => {
  const search = (event) => {
    const inputText = event.target.value;
    const columnsFilter = ['name', 'father', 'mother'];

    const searchResult = columnsFilter.map(item => (
      props.people.filter(person => (
        person[item] !== null && person[item].includes(inputText)
      ))
    ));

    const allResult = [...new Set(
      searchResult.reduce((acc, item) => acc.concat(item))
    )];

    props.handleSearch(allResult, inputText);
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
