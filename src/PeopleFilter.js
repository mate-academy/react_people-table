import React from 'react';
import PropTypes from 'prop-types';

const PeopleFilter = ({ setQuery }) => (
  <label>
    Enter name (part of name) to find a person: &nbsp;
    <input
      className="People--filter"
      type="text"
      onChange={event => setQuery(event.target.value)}
    />
  </label>
);

PeopleFilter.propTypes = { setQuery: PropTypes.func.isRequired };

export default PeopleFilter;
