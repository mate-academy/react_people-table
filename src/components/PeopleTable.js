import React from 'react';
import propTypes from 'prop-types';
import People from './People';
import './PeopleTable.css';

const findChildren = arrayData => [...arrayData].map(parrent => ({
  ...parrent,
  children: parrent.sex === 'm'
    ? [...arrayData].find(child => child.father === parrent.name)
    : [...arrayData].find(child => child.mother === parrent.name),
}));

// eslint-disable-next-line react/prop-types
const PeopleTable = ({ peopleData }) => (
  <table className="PeopleTable">
    <thead>
      <tr className="table-head">
        <td>id</td>
        <td>name</td>
        <td>sex</td>
        <td>born</td>
        <td>died</td>
        <td>age</td>
        <td>century</td>
        <td>mother</td>
        <td>father</td>
        <td>children</td>
      </tr>
    </thead>
    <tbody>
      {
        findChildren(peopleData)
          .map(onePersonData => <People humanData={onePersonData} />)
      }
    </tbody>
  </table>
);

propTypes.PeopleTable = {
  peopleData: propTypes.object,
};

export default PeopleTable;
