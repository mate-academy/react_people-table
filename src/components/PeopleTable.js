import React from 'react';
import { Table } from 'semantic-ui-react';
import TableRow from './TableRow';
import '../app.css';

function PeopleTable({ people, selector, props }) {
  return (
    <Table celled className="PeopleTable">
      <thead>
        <Table.Row>
          <Table.HeaderCell>id</Table.HeaderCell>
          <Table.HeaderCell>name</Table.HeaderCell>
          <Table.HeaderCell>sex</Table.HeaderCell>
          <Table.HeaderCell>born</Table.HeaderCell>
          <Table.HeaderCell>died</Table.HeaderCell>
          <Table.HeaderCell>age</Table.HeaderCell>
          <Table.HeaderCell>century</Table.HeaderCell>
          <Table.HeaderCell>mother</Table.HeaderCell>
          <Table.HeaderCell>father</Table.HeaderCell>
        </Table.Row>
      </thead>
      <tbody>
        {people.map((person, index) => (
          <TableRow
            person={person}
            index={index}
            key={person.name}
            selector={selector}
            props={props}
          />
        ))}
      </tbody>
    </Table>
  );
}

export default PeopleTable;
