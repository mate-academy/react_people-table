import React, { FC } from 'react';
import { PeopleListInterface } from '../../interfaces';
import { PersonRow } from '../PersonRow/PersonRow';

import './PeopleTable.css';

interface PeopleTableProps {
  people: PeopleListInterface[];
}

export const PeopleTable: FC<PeopleTableProps> = ({ people }) => {
  return (
    <table className="PeopleTable">
      <thead>
        <tr>
          <th scope="col">№</th>
          <th scope="col">Name</th>
          <th scope="col">Sex</th>
          <th scope="col">Born</th>
          <th scope="col">Died</th>
          <th scope="col">Mother</th>
          <th scope="col">Father</th>
        </tr>
      </thead>
      <PersonRow people={people} />
    </table>
  );
};
