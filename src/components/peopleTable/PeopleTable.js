import React from 'react';
import PropTypes from 'prop-types';
import { Table } from 'semantic-ui-react';
import Person from '../Person/Person';

class PeopleTable extends React.Component {
  state = {
    selectedLine: null,
  };

  selectLine = (id) => {
    this.setState({
      selectedLine: id,
    });
  };

  render() {
    const { people, sort } = this.props;
    const { selectedLine } = this.state;

    return (
      <Table sortable celled fixed>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell width={1} onClick={() => sort('id')}>
              Id
            </Table.HeaderCell>
            <Table.HeaderCell width={2} onClick={() => sort('name')}>
              Name
            </Table.HeaderCell>
            <Table.HeaderCell width={1} onClick={() => sort('sex')}>
              Sex
            </Table.HeaderCell>
            <Table.HeaderCell width={1} onClick={() => sort('bord')}>
              Born
            </Table.HeaderCell>
            <Table.HeaderCell width={1} onClick={() => sort('died')}>
              Died
            </Table.HeaderCell>
            <Table.HeaderCell width={1} onClick={() => sort('age')}>
              Age
            </Table.HeaderCell>
            <Table.HeaderCell width={1} onClick={() => sort('century')}>
              Century
            </Table.HeaderCell>
            <Table.HeaderCell width={2}>Mother</Table.HeaderCell>
            <Table.HeaderCell width={2}>Father</Table.HeaderCell>
            <Table.HeaderCell width={3}>Children</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {people.map(person => (
            <Person
              key={person.id}
              person={person}
              selectedLine={person.id === selectedLine}
              selectLine={this.selectLine}
            />
          ))}
        </Table.Body>
      </Table>
    );
  }
}

PeopleTable.propTypes = {
  people: PropTypes.arrayOf(PropTypes.object).isRequired,
  sort: PropTypes.func.isRequired,
};

export default PeopleTable;
