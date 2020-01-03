import React from 'react';
import PropTypes from 'prop-types';

const SortingButtonGroup = props => (
  <>
    <button
      type="button"
      onClick={props.changeSortingType}
      data-sorting-type="name"
    >
      Sort by name
    </button>
    <button
      type="button"
      onClick={props.changeSortingType}
      data-sorting-type="id"
    >
      Sort by id
    </button>
    <button
      type="button"
      onClick={props.changeSortingType}
      data-sorting-type="sex"
    >
    Sort by sex
    </button>
    {' '}
    <button
      type="button"
      onClick={props.changeSortingType}
      data-sorting-type="born"
    >
    Sort by born
    </button>
    {' '}
    <button
      type="button"
      onClick={props.changeSortingType}
      data-sorting-type="died"
    >
    Sort by died
    </button>
    {' '}
    <button
      type="button"
      onClick={props.changeSortingType}
      data-sorting-type="age"
    >
    Sort by age
    </button>
    <button
      type="button"
      onClick={props.changeSortingType}
      data-sorting-type="century"
    >
      Sort by century
    </button>
  </>
);

SortingButtonGroup.defaultProps = {
  changeSortingType: {},
};

SortingButtonGroup.propTypes = {
  changeSortingType: PropTypes.func,
};

export default SortingButtonGroup;
