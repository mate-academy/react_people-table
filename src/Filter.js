import React from 'react';
import PropTypes from 'prop-types';

const Filter = (props) => {
  const filterKeys = ['name', 'mother', 'father'];

  return (
    <div className="table__sort">
      {filterKeys.map(item => (
        <label htmlFor="name">
          Filter by&nbsp;
          {item}
          &nbsp;
          <input
            type="text"
            id={item}
            onChange={props.handleName}
            className="sort__input"
          />
        </label>
      ))}
    </div>
  );
};

Filter.propTypes = { handleName: PropTypes.func.isRequired };

export default Filter;
