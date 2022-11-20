import React from 'react';
import { PeopleTableHeader } from '../PeopleTableHeader';
import { TableHeaderField } from '../../types/TableHeaderField';

export const PeopleTableHeaderRow: React.FC = () => {
  return (
    <thead>
      <tr>
        <PeopleTableHeader tableHeaderName={TableHeaderField.Name} />
        <PeopleTableHeader tableHeaderName={TableHeaderField.Sex} />
        <PeopleTableHeader tableHeaderName={TableHeaderField.Born} />
        <PeopleTableHeader tableHeaderName={TableHeaderField.Died} />
        <PeopleTableHeader tableHeaderName={TableHeaderField.Mother} />
        <PeopleTableHeader tableHeaderName={TableHeaderField.Father} />
      </tr>
    </thead>
  );
};
