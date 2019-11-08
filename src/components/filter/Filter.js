import React from 'react';
import PropTypes from 'prop-types';

function Filter({ onValueChanged }) {
  const onInputChange = (event) => {
    onValueChanged(event.target.value);
  };

  return (
    <div className="ui icon input">
      <input
        type="text"
        placeholder="Who are you looking for?"
        onChange={onInputChange}
      />
      <i aria-hidden="true" className="search circular inverted link icon" />
    </div>
  );
}

Filter.propTypes = {
  onValueChanged: PropTypes.func.isRequired,
};

export default Filter;
