// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react';
import * as api from '../../api/GetPeople';
import { PeoplesList } from './PeopleList';

export const Peoples = () => {
  const [people, setPeople] = useState('');

  const tableTitle = ['Name', 'Sex', 'Born', 'Died', 'Mother', 'Father'];

  useEffect(() => {
    api.getPeople().then(setPeople);
  }, []);

  return (
    <>
      <h1 className="title">Peoples Page</h1>
      <table className="table">
        <thead className="table__title">
          <tr>
            {tableTitle.map(item => (
              <th className="table__title-item" key={item}>{item}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          <PeoplesList people={[...people]} />
        </tbody>
      </table>
    </>
  );
};
