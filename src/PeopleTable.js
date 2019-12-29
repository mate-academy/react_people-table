import React from 'react';
import PropTypes from 'prop-types';
import Person from './Person';

const PeopleTable = ({ people, sortPeople }) => (

  <table>
    <thead>
      <tr>
        <th>id</th>
        <th
          onClick={() => sortPeople('name')}
        >
        name
        </th>
        <th
          onClick={() => sortPeople('sex')}
        >
          sex
        </th>
        <th
          onClick={() => sortPeople('born')}
        >
          born
        </th>
        <th
          onClick={() => sortPeople('died')}
        >
          died
        </th>
        <th
          onClick={() => sortPeople('age')}
        >
          age
        </th>
        <th
          onClick={() => sortPeople('centery')}
        >
          century
        </th>
        <th>mother</th>
        <th>father</th>
      </tr>
    </thead>
    {people.map((item, i) => (
      <tbody key={item.name}>
        <Person item={item} index={i} />
      </tbody>
    ))}
  </table>

);

PeopleTable.propTypes = {
  people: PropTypes.arrayOf(PropTypes.object).isRequired,
  sortPeople: PropTypes.func.isRequired,
};

export default PeopleTable;
