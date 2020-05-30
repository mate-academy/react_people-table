import React from 'react';
import { Person } from './Person';
import { TableHeader } from './TableHeader';

type Props = {
  people: PreparedPerson[];
};

export const PeopleTable: React.FC<Props> = ({ people }) => {
  const tableCaptions = ['Name', 'Sex', 'Born', 'Died', 'Mother', 'Father'];

  return (
    <table className="table">
      <caption className="table__capture">People table</caption>
      <TableHeader columnNames={tableCaptions} />
      <tbody className="table__body">
        {people.map((person) => (
          <Person info={person} key={person.name + person.died} />
        ))}
      </tbody>
    </table>
  );
};
