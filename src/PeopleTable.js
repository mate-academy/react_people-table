import React from 'react';
import PropTypes from 'prop-types';
import Person from './Person';

const PeopleTable = (props) => {
  if (!props.people.length) {
    return [];
  }

  const head = [...Object.keys(props.people[0]), 'age', 'century'];

  return (
    <table
      border="1"
      className="people-table"
    >
      <thead>
        <tr>
          {head.map(item => <th key={item}>{item}</th>)}
        </tr>
      </thead>
      <tbody>
        {<Person
          people={props.people}
          selectText={props.selectText}
        />}
      </tbody>
    </table>
  );
};

PeopleTable.propTypes = {
  people: PropTypes.arrayOf.isRequired,
  selectText: PropTypes.string.isRequired,
};

export default PeopleTable;
