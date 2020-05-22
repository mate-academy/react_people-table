import React, { useEffect, useState } from 'react';
import { getPeople } from './api';
import { PersonRow } from './PersonRow';

export const PeopleTable = () => {
  const [people, setPeople] = useState<Person[]>([]);

  useEffect(() => {
    getPeople().then(setPeople);
  }, []);

  const tableHeads = [
    'Name',
    'Sex',
    'Born',
    'Died',
    'Mother',
    'Father',
  ];

  return (
    <>
      <table className="peopleTable">
        <thead>
          <tr>
            {tableHeads.map(item => (
              <th key={item}>
                {item}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          <PersonRow people={people} />
        </tbody>
      </table>
    </>
  );
};
