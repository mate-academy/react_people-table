import React from 'react';
import PropTypes from 'react'

import Person from './Person';

class PeopleTable extends React.Component {

  render() {
    const { peoples, sortPeople } = this.props;

    return (
      <table className='table table-bordered'>
        <thead className='thead-dark'>
          <tr>
            <th onClick={() => sortPeople('id')}>id</th>
            <th onClick={() => sortPeople('name')}>name</th>
            <th>sex</th>
            <th onClick={() => sortPeople('born')}>born</th>
            <th onClick={() => sortPeople('died')}>died</th>
            <th>mother</th>
            <th>father</th>
            <th onClick={() => sortPeople('age')}>age</th>
            <th>century</th>
            <th>children</th>
          </tr>
        </thead>
        <Person peoples={peoples} />
      </table>
    );
  }
}

export default PeopleTable;
