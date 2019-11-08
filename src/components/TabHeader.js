import React from 'react';
import { Table } from 'semantic-ui-react';

const TabHeader = () => (
  <Table.Header>
    <Table.Row>
      <Table.HeaderCell>Id</Table.HeaderCell>
      <Table.HeaderCell>Name</Table.HeaderCell>
      <Table.HeaderCell>Sex</Table.HeaderCell>
      <Table.HeaderCell>Born</Table.HeaderCell>
      <Table.HeaderCell>Died</Table.HeaderCell>
      <Table.HeaderCell>Age</Table.HeaderCell>
      <Table.HeaderCell>Century</Table.HeaderCell>
      <Table.HeaderCell>Mother</Table.HeaderCell>
      <Table.HeaderCell>Father</Table.HeaderCell>
    </Table.Row>
  </Table.Header>
);

export default TabHeader;
