import React from 'react';
import cn from 'classnames';
import { Table, Menu, Icon } from 'semantic-ui-react';
import TableCells from '../TableCells';
import './PeopleTable.scss';

type Props = {
  path: string;
  people: Person[];
  tableHeaders: TableHeader[];
  sortTable: (arg: string) => void;
  onSelect: (field: string, person: Person) => void;
};

const PeopleTable: React.FC<Props> = ({ path, people, tableHeaders, sortTable, onSelect }) => {
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
              onSelect={onSelect}
            />
          </Table.Row>
        ))}
      </Table.Body>

      <Table.Footer>
        <Table.Row>
          <Table.HeaderCell colSpan="3">
            <Menu floated="right" pagination>
              <Menu.Item as="a" icon>
                <Icon name="chevron left" />
              </Menu.Item>
              <Menu.Item as="a">1</Menu.Item>
              <Menu.Item as="a">2</Menu.Item>
              <Menu.Item as="a">3</Menu.Item>
              <Menu.Item as="a">4</Menu.Item>
              <Menu.Item as="a" icon>
                <Icon name="chevron right" />
              </Menu.Item>
            </Menu>
          </Table.HeaderCell>
        </Table.Row>
      </Table.Footer>
    </Table>
  );
};

export default PeopleTable;
