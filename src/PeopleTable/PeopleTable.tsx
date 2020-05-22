import React, { useState, useEffect } from 'react';
// import { NavLink, Route } from 'react-router-dom';
import { getPeople } from '../api/api';
import { PersonRow } from '../Person/PersonRow';
import './PeopleTable.scss';

export const PeopleTable = () => {
  const [people, setPeople] = useState<Person[]>([]);

  useEffect(() => {
    getPeople()
      .then(data => setPeople(
        data.map((person, index) => (
          {
            ...person,
            id: index + 1,
          }
        )),
      ));
  }, []);

  return (
    <>
      <table className="people">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Sex</th>
            <th>Born</th>
            <th>Died</th>
            <th>Mother</th>
            <th>Father</th>
          </tr>
        </thead>
        <tbody>
          <PersonRow people={people} />
        </tbody>
      </table>
    </>
  );
};
