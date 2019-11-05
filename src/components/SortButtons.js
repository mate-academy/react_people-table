import React from 'react';
import PropTypes from 'prop-types';

const SortButtons = ({ changeSortMethod }) => (
  <div>
    <button
      type="button"
      onClick={() => changeSortMethod('by name')}
    >
      Sort by name
    </button>
    <button
      type="button"
      onClick={() => changeSortMethod('by id')}
    >
      Sort by Id
    </button>
    <button
      type="button"
      onClick={() => changeSortMethod('by sex')}
    >
      Sort by sex
    </button>
    <button
      type="button"
      onClick={() => changeSortMethod('by birth year')}
    >
      Sort by birth year
    </button>
    <button
      type="button"
      onClick={() => changeSortMethod('by year of death')}
    >
      Sort by year of death
    </button>
    <button
      type="button"
      onClick={() => changeSortMethod('by age')}
    >
      Sort by age
    </button>
    <button
      type="button"
      onClick={() => changeSortMethod('by century')}
    >
      Sort by century
    </button>
  </div>
);

SortButtons.propTypes = {
  changeSortMethod: PropTypes.func.isRequired,
};

export default SortButtons;
