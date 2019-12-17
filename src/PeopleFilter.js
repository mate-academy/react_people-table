import React from 'react';
import PropTypes from 'prop-types';

const PeopleFilter = ({ filterPeople }) => (
  <label>
    Enter name (part of name) to find a person: &nbsp;
    <input
      className="People--filter"
      type="text"
      onChange={event => filterPeople(event.target.value)}
    />
  </label>
);

PeopleFilter.propTypes = { filterPeople: PropTypes.func.isRequired };

export default PeopleFilter;
