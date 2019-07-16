import React from 'react';
import PropTypes from 'prop-types';

import Person from './Person';

const PeopleTable = ({ people }) => (
  <>
    {people.map(onePerson => (
      <Person person={onePerson} key={onePerson.id} />
    ))}
  </>
);

PeopleTable.propTypes = {
  people: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default PeopleTable;
