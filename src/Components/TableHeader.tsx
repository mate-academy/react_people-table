import React from 'react';
import { HeaderCell } from './HeaderCell';

type Props = {
  columnNames: string[];
};

export const TableHeader: React.FC<Props> = ({ columnNames }) => {
  return (
    <thead className="table__header">
      <tr className="table__header-row">
        {columnNames.map(name => <HeaderCell name={name} key={name} />)}
      </tr>
    </thead>
  );
};
