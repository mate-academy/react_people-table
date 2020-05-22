import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import { HeaderCell } from './HeaderCell';

type Props = {
  columnNames: string[];
};

export const TableHeader: React.FC<Props> = ({ columnNames }) => {
  return (
    <thead>
      <tr>
        {' '}
        {columnNames.map(name => <HeaderCell name={name} key={uuidv4()} />)}
      </tr>
    </thead>
  );
};
