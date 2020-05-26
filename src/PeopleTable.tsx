import React from 'react';
import { PersonRow } from './PersonRow';

type Props = {
  people: Person[];
};

export const PeopleTable: React.FC<Props> = ({ people }) => {
  return (
    <table className="PeopleTable">
      <thead className="table__head">
        <tr>
          <th>Name</th>
          <th>Sex</th>
          <th>Born</th>
          <th>Died</th>
          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>
      <tbody>
        {people !== undefined
        && (people.map((person, id) => (
          <PersonRow person={person} id={id} />
        )))}
      </tbody>
    </table>
  );
};
