import React from 'react';
import PropTypes from 'prop-types';

function Sorting(props) {
  return (
    <div className="button-wrapper">
      <button
        className="load-button"
        type="button"
        onClick={() => props.handleSort('id')}
      >
        Sort by ID
      </button>
      <button
        className="load-button"
        type="button"
        onClick={() => props.handleSort('name')}
      >
        Sort by name
      </button>
      <button
        className="load-button"
        type="button"
        onClick={() => props.handleSort('sex')}
      >
        Sort by sex
      </button>
      <button
        className="load-button"
        type="button"
        onClick={() => props.handleSort('born')}
      >
        Sort by date of birth
      </button>
      <button
        className="load-button"
        type="button"
        onClick={() => props.handleSort('died')}
      >
        Sort by date of death
      </button>
      <button
        className="load-button"
        type="button"
        onClick={() => props.handleSort('age')}
      >
        Sort by age
      </button>
      <button
        className="load-button"
        type="button"
        onClick={() => props.handleSort('century')}
      >
        Sort by century
      </button>
    </div>
  );
}

Sorting.propTypes = {
  handleSort: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default Sorting;
