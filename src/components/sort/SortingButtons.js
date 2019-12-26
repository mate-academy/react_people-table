import React from 'react';
import PropTypes from 'prop-types';

const SortingButtons = ({ changeSortType }) => {
  return (
    <div className='sort'>
      <button onClick={() => changeSortType('name')}>Sort by name</button>
      <button onClick={() => changeSortType('id')}>Sort by id</button>
      <button onClick={() => changeSortType('sex')}>Sort by sex</button>
      <button onClick={() => changeSortType('born')}>Sort by born</button>
      <button onClick={() => changeSortType('died')}>Sort by died</button>
      <button onClick={() => changeSortType('age')}>Sort by age</button>
      <button onClick={() => changeSortType('century')}>Sort by century</button>
      <button onClick={() => changeSortType('all')}>Reset</button>
    </div>
  )
}

SortingButtons.propTypes = {
  SortingButtons: PropTypes.func.isRequired,
}

export default SortingButtons;
