import React from 'react';
import { Table } from 'semantic-ui-react';
import TabCell from './TabCell';

const TabRow = ({ person, isActive, onRawSelected }) => (
  <Table.Row
    key={person.id}
    onClick={onRawSelected}
    className={isActive ? 'negative' : ''}
  >
    <TabCell
      person={person}
    />
  </Table.Row>
);

export default TabRow;
