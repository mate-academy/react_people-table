import React, { FC } from 'react';

const tableHead: string[] = [
  'Name',
  'Sex',
  'Born',
  'Died',
  'Mother',
  'Father',
];

export const PeopleTableHead: FC = () => {
  return (
    <thead>
      <tr>
        {tableHead.map(head => {
          return (
            <th
              key={head}
              scope="col"
            >
              {head}
            </th>
          );
        })}
      </tr>
    </thead>
  );
};
