import React from 'react';
// import cn from 'classnames';
import { Table, Menu, Icon, Label } from 'semantic-ui-react';
import './PeopleTable.scss';

type Props = {
  people: Person[];
  tableHeaders: TableHeader[];
};

const PeopleTable: React.FC<Props> = ({ people, tableHeaders }) => {
  return (
    <Table celled>
      <Table.Header>
        <Table.Row>
          {tableHeaders.map(({ name, code }) => (
            <Table.HeaderCell
              // as="button"
              key={name}
              value={code}
              content={name}
              className="sort-button"
              // onClick={sortTable}
            />
          ))}
        </Table.Row>
      </Table.Header>

      <Table.Body>
        {people.map(person => (
          <Table.Row>
            {tableHeaders.map(({ code }) => (
              <Table.Cell
                key={code}
                content={person[code]}
              />
            ))}
            <Label ribbon>First</Label>
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
