import React from 'react';
// import { Link } from 'react-router-dom';
// import cn from 'classnames';
import { Table, Menu, Icon } from 'semantic-ui-react';
import './PeopleTable.scss';

type Props = {
  people: Person[];
  tableHeaders: TableHeader[];
  sortTable: (event: React.MouseEvent<HTMLTableHeaderCellElement>) => void;
};

const PeopleTable: React.FC<Props> = ({ people, tableHeaders, sortTable }) => {
  return (
    <Table celled>
      <Table.Header>
        <Table.Row>
          {tableHeaders.map(({ name, code }) => (
            <Table.HeaderCell
              // as={Link}
              key={name}
              content={name}
              className="sort-button"
              data-sort-name={code}
              onClick={sortTable}
            />
          ))}
        </Table.Row>
      </Table.Header>

      <Table.Body>
        {people.map(person => (
          <Table.Row key={person.id}>
            {tableHeaders.map(({ code }) => (
              <Table.Cell
                key={code}
                content={person[code]}
              />
            ))}
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
