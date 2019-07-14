import React from 'react';
import PropTypes from 'prop-types';

function PeopleTable(props) {
  return (
    <>
      <thead>
        <tr>
          <th onClick={() => props.sort('id')}>
            id:
          </th>
          <th onClick={() => props.sort('name')}>
            name:
          </th>
          <th onClick={() => props.sort('sex')}>
            sex:
          </th>
          <th onClick={() => props.sort('born')}>
            born:
          </th>
          <th onClick={() => props.sort('died')}>
            died:
          </th>
          <th onClick={() => props.sort('mother')}>
            mother:
          </th>
          <th onClick={() => props.sort('father')}>
            father:
          </th>
          <th onClick={() => props.sort('age')}>
            age:
          </th>
          <th onClick={() => props.sort('century')}>
            century:
          </th>
          <th onClick={() => props.sort('children')}>
            children:
          </th>
        </tr>
      </thead>
    </>
  );
}

PeopleTable.propTypes = {
  sort: PropTypes.func.isRequired,
};

export default PeopleTable;
