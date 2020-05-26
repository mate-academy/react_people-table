import React from 'react';
import { PersonRow } from './PersonRow';

type Props = {
  people: Person[];
};

export const PeopleTable: React.FC<Props> = ({ people }) => {
  const columns = ['Name', 'Sex', 'Born', 'Died', 'Mother', 'Father'];

  return (
    <table className="table">
      <thead className="">
        <tr>
          {columns.map(item => (
            <th>{item}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {people
        && (people.map((person) => (
          <PersonRow person={person} />
        )))}
      </tbody>
    </table>
  );
};
