import React from 'react';
import PropTypes from 'prop-types';

class Sort extends React.Component {
  render(){
    const { sortTypeChange } = this.props;

    return (
      <>
        <div className='sort'>
          <button onClick={() => sortTypeChange('name')}>Sort by name</button>
          <button onClick={() => sortTypeChange('id')}>Sort by id</button>
          <button onClick={() => sortTypeChange('sex')}>Sort by sex</button>
          <button onClick={() => sortTypeChange('born')}>Sort by born</button>
          <button onClick={() => sortTypeChange('died')}>Sort by died</button>
          <button onClick={() => sortTypeChange('age')}>Sort by age</button>
          <button onClick={() => sortTypeChange('century')}>Sort by century</button>
          <button onClick={() => sortTypeChange('all')}>Reset</button>
        </div>

      </>
    )
  }
}

Sort.propTypes = {
  sortTypeChange: PropTypes.func.isRequired,
}

export default Sort;
