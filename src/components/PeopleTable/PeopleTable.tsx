import React from 'react';
import cn from 'classnames';
import { Table } from 'semantic-ui-react';
import TableCells from '../TableCells';
import Paginator from '../Paginator';
import './PeopleTable.scss';

type Props = {
  path: string;
  page: number;
  perPage: number;
  totalPages: number;
  people: Person[];
  tableHeaders: TableHeader[];
  onSortTable: (field: string) => void;
  onSelectPerson: (field: string, person: Person) => void;
  onSelectPage: (_: React.SyntheticEvent, data: object) => void;
  onSelectPerPage: (_: React.SyntheticEvent, data: object) => void;
};

const PeopleTable: React.FC<Props> = React.memo(
  ({
    path,
    page,
    perPage,
    totalPages,
    people,
    tableHeaders,
    onSortTable,
    onSelectPerson,
    onSelectPage,
    onSelectPerPage,
  }) => {
    return (
      <Table celled className="PeopleTable">
        <Table.Header>
          <Table.Row className="PeopleTable-TableRow">
            {tableHeaders.map(({ name, code }) => (
              <Table.HeaderCell
                key={code}
                content={name}
                className="PeopleTable-HeaderCell"
                onClick={() => onSortTable(code)}
              />
            ))}
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {people.map(person => (
            <Table.Row
              key={person.id}
              warning={person.slug === path}
              className={cn({
                'PeopleTable-TableRow': true,
                'PeopleTable-TableRow_male': person.sex === 'm',
                'PeopleTable-TableRow_female': person.sex === 'f',
              })}
            >
              <TableCells
                person={person}
                tableHeaders={tableHeaders}
                onSelect={onSelectPerson}
              />
            </Table.Row>
          ))}
        </Table.Body>

        <Table.Footer>
          <Table.Row className="PeopleTable-TableRow">
            <Paginator
              page={page}
              perPage={perPage}
              totalPages={totalPages}
              onSelectPage={onSelectPage}
              onSelectPerPage={onSelectPerPage}
            />
          </Table.Row>
        </Table.Footer>
      </Table>
    );
  },
);


export default PeopleTable;
