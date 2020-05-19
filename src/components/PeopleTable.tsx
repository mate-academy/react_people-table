import React from 'react';
import { Person } from './Person';

export const PeopleTable = ({ people, handleSort }: PeopleProps) => {
  const theads = [
    'ID', 'Name', 'Sex', 'Born', 'Died', 'Age', 'Century', 'Father', 'Mother', 'Children',
  ];

  return (
    <table className="people__table highlight">
      <thead>
        <tr>
          {theads.map(th => (
            <th
              key={th}
              onClick={handleSort}
            >
              {th}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {people.map(person => (
          <React.Fragment key={person.id}>
            <Person {...person} />
          </React.Fragment>
        ))}
      </tbody>
    </table>
  );
};
