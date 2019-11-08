import React from 'react';
import PropTypes from 'prop-types';

function Sort({ sort }) {
  return (
    <div className="ui buttons">
      <button
        type="button"
        className="ui button"
        onClick={() => sort('id')}
      >
        Sort by Id
      </button>
      <button
        type="button"
        className="ui button"
        onClick={() => sort('name')}
      >
        Sort by Name
      </button>
      <button
        type="button"
        className="ui button"
        onClick={() => sort('sex')}
      >
        Sort by Sex
      </button>
      <button
        type="button"
        className="ui button"
        onClick={() => sort('born')}
      >
        Sort by Born
      </button>
      <button
        type="button"
        className="ui button"
        onClick={() => sort('died')}
      >
        Sort by Died
      </button>
      <button
        type="button"
        className="ui button"
        onClick={() => sort('age')}
      >
        Sort by Age
      </button>
      <button
        type="button"
        className="ui button"
        onClick={() => sort('century')}
      >
        Sort by Century
      </button>
    </div>
  );
}

Sort.propTypes = {
  sort: PropTypes.func.isRequired,
};

export default Sort;
