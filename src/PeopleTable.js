import React from 'react';
import propTypes from 'prop-types';
import Person from './Person';
import './styles/peopleTable.css';

const PeopleTable = ({ people }) => (
  <table className="people-table">
    <thead className="people-table__thead">
      <tr>
        <th className="people-table__item">ID</th>
        <th className="people-table__item">Name</th>
        <th className="people-table__item">Sex</th>
        <th className="people-table__item">Born</th>
        <th className="people-table__item">Died</th>
        <th className="people-table__item">Age</th>
        <th className="people-table__item">Century</th>
        <th className="people-table__item">Mother</th>
        <th className="people-table__item">Father</th>
      </tr>
    </thead>
    <tbody>
      {people.map((person) => {
        const id = people.indexOf(person);
        console.log(id);
        return (
          <Person
            person={
              {
                ...person,
                id,
              }
            }
            key={id}
          />
        );
      })}
    </tbody>
  </table>
);

PeopleTable.propTypes = {
  people: propTypes.shape().isRequired,
};

export default PeopleTable;
