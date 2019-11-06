import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Table } from 'semantic-ui-react';
import Person from '../person/Person';

class PeopleTable extends PureComponent {
  state = {
    selectedPersonId: null,
  };

  selectPerson = (event) => {
    this.setState({
      selectedPersonId: Number(event.currentTarget.dataset.personId),
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
              key={person.name}
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

PeopleTable.propTypes = {
  people: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    sex: PropTypes.string.isRequired,
    born: PropTypes.number.isRequired,
    died: PropTypes.number.isRequired,
    father: PropTypes.string,
    mother: PropTypes.string,
  })).isRequired,
};

export default PeopleTable;
