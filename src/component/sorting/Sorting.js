import React from 'react';
import PropTypes from 'prop-types';
import './Sorting.css';

function Sorting({ onSort }) {
  return (
    <div className="buttons">
      <button
        type="button"
        className="ui secondary basic button"
        onClick={() => onSort('id')}
      >
        Sort by id
      </button>
      <button
        type="button"
        className="ui positive basic button"
        onClick={() => onSort('sex')}
      >
        Sort by Sex
      </button>
      <button
        type="button"
        className="ui primary basic button"
        onClick={() => onSort('name')}
      >
        Sort by Name
      </button>
      <button
        type="button"
        className="ui negative basic button"
        onClick={() => onSort('age')}
      >
        Sort by Age
      </button>
      <button
        type="button"
        className="ui negative basic button"
        onClick={() => onSort('born')}
      >
        Sort by Born
      </button>
      <button
        type="button"
        className="ui negative basic button"
        onClick={() => onSort('died')}
      >
        Sort by Died
      </button>
      <button
        type="button"
        className="ui negative basic button"
        onClick={() => onSort('century')}
      >
        Sort by Century
      </button>
    </div>
  );
}

Sorting.propTypes = {
  onSort: PropTypes.func.isRequired,
};

export default Sorting;
