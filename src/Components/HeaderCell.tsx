import React from 'react';

type Props = {
  name: string;
};

export const HeaderCell: React.FC<Props> = ({ name }) => (
  <th className="table__header-cell">{name}</th>
);
