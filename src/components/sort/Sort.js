import React from 'react';
import PropTypes from 'prop-types';

const Sort = ({ SortingButtons }) => {
  return (
    <div className='sort'>
      <button onClick={() => SortingButtons('name')}>Sort by name</button>
      <button onClick={() => SortingButtons('id')}>Sort by id</button>
      <button onClick={() => SortingButtons('sex')}>Sort by sex</button>
      <button onClick={() => SortingButtons('born')}>Sort by born</button>
      <button onClick={() => SortingButtons('died')}>Sort by died</button>
      <button onClick={() => SortingButtons('age')}>Sort by age</button>
      <button onClick={() => SortingButtons('century')}>Sort by century</button>
      <button onClick={() => SortingButtons('all')}>Reset</button>
    </div>
  )
}

Sort.propTypes = {
  SortingButtons: PropTypes.func.isRequired,
}

export default Sort;
