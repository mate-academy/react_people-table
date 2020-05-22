import React from 'react';

type Props = {
  info: Person;
  id: number;
};

export const Person: React.FC<Props> = ({ info, id }) => {
  const values = Object.values(info);

  return (
    <tr>
      <td>{id}</td>
      {values.map((value) => <td>{value}</td>)}
    </tr>
  );
};
