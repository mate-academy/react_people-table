import React from 'react';
import cn from 'classnames';
import { Table } from 'semantic-ui-react';
import TableCells from '../TableCells';
import Paginator from '../Paginator';
import './PeopleTable.scss';

type Props = {
  path: string;
  page: number;
  totalPages: number;
  people: Person[];
  tableHeaders: TableHeader[];
  sortTable: (arg: string) => void;
  onSelectPerson: (field: string, person: Person) => void;
  onSelectPage: (_: React.SyntheticEvent, { activePage }: any) => void;
};

const PeopleTable: React.FC<Props> = ({
  path,
  page,
  totalPages,
  people,
  tableHeaders,
  sortTable,
  onSelectPerson,
  onSelectPage,
}) => {
  return (
    <Table celled className="PeopleTable">
      <Table.Header>
        <Table.Row>
          {tableHeaders.map(({ name, code }) => (
            <Table.HeaderCell
              key={name}
              content={name}
              className="sort-button"
              onClick={() => sortTable(code)}
            />
          ))}
        </Table.Row>
      </Table.Header>

      <Table.Body>
        {people.map(person => (
          <Table.Row
            key={person.id}
            warning={person.slug === path}
            className={cn('PeopleTable-TableRow', {
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
        <Table.Row>
          <Paginator
            page={page}
            totalPages={totalPages}
            onSelectPage={onSelectPage}
          />
        </Table.Row>
      </Table.Footer>
    </Table>
  );
};

export default PeopleTable;
