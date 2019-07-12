import React from 'react';
import PropTypes from 'prop-types';

import Person from './Person';
import TableHeader from './TableHeader';
import './PeopleTable.css';

const PeopleTable = props => (
  <table className="PeopleTable">
    <TableHeader handleSort={props.handleSort} />
    <Person
      people={props.people}
      handlePersonRowClick={props.handlePersonRowClick}
      personRowSelectedId={props.personRowSelectedId}
      personRowSelected={props.personRowSelected}
    />
  </table>
);

PeopleTable.propTypes = {
  handleSort: PropTypes.func.isRequired,
  handlePersonRowClick: PropTypes.func.isRequired,
  people: PropTypes.arrayOf(PropTypes.object).isRequired,
  personRowSelectedId: PropTypes.string.isRequired,
  personRowSelected: PropTypes.bool.isRequired,
};

export default PeopleTable;
