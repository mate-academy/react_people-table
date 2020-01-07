import React from 'react';
import PropTypes from 'prop-types';
import Person from './Person';

const PeopleTable = ({ people, setSortingByParams }) => (
  <table className="people__table">
    <tr>
      <th
        className="people__table-rows"
        onClick={() => setSortingByParams('id')}
      >
ID
      </th>
      <th
        className="people__table-rows"
        onClick={() => setSortingByParams('name')}
      >
Name
      </th>
      <th
        className="people__table-rows"
        onClick={() => setSortingByParams('sex')}
      >
Sex
      </th>
      <th
        className="people__table-rows"
        onClick={() => setSortingByParams('born')}
      >
Born
      </th>
      <th
        className="people__table-rows"
        onClick={() => setSortingByParams('died')}
      >
Died
      </th>
      <th className="people__table-rows"> Father </th>
      <th className="people__table-rows"> Mother </th>
      <th
        className="people__table-rows"
        onClick={() => setSortingByParams('age')}
      >
Age
      </th>
      <th
        className="people__table-rows"
        onClick={() => setSortingByParams('century')}
      >
Century
      </th>
    </tr>
    <tbody>
      {people.map(person => (
        <Person person={person} key={person.id} />
      ))}
    </tbody>
  </table>
);

PeopleTable.propTypes = {
  people: PropTypes.arrayOf(PropTypes.object).isRequired,
  setSortingByParams: PropTypes.func.isRequired,
};

export default PeopleTable;
