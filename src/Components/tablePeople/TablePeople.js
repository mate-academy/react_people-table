import React, { Component } from 'react';
import { Table } from 'semantic-ui-react';
import Person from '../person/Person';

class TablePeople extends Component {
  state = {
    selectedPersonId: null,
  };

  selectPerson = (event) => {
    this.setState({
      selectedPersonId: +event.currentTarget.dataset.personId,
    });
  };

  render() {
    const { people } = this.props;
    const { selectedPersonId } = this.state;

    return (
      <Table celled selectable>
        <Table.Header>
          <Table.Row textAlign="center">
            <Table.HeaderCell>id</Table.HeaderCell>
            <Table.HeaderCell>Name</Table.HeaderCell>
            <Table.HeaderCell>Sex</Table.HeaderCell>
            <Table.HeaderCell>Age</Table.HeaderCell>
            <Table.HeaderCell>Born</Table.HeaderCell>
            <Table.HeaderCell>Died</Table.HeaderCell>
            <Table.HeaderCell>Century</Table.HeaderCell>
            <Table.HeaderCell>Mother</Table.HeaderCell>
            <Table.HeaderCell>Father</Table.HeaderCell>
            <Table.HeaderCell>Children</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {people.map((person, index) => (
            <Person
              key={Math.random()}
              person={person}
              personId={index + 1}
              onClick={this.selectPerson}
              selectedId={selectedPersonId}
            />
          ))}
        </Table.Body>
      </Table>
    );
  }
}

export default TablePeople;
