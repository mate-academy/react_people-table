import React, { Component } from 'react';
import { Table } from 'semantic-ui-react';
import TabHeader from './TabHeader';
import TabRow from './TabRow';

class DataTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeId: null,
    };
  }

  updateActiveRow = (val) => {
    this.setState(prev => ({
      ...prev,
      activeId: val,
    }));
  }

  render() {
    return (
      <Table celled>
        <TabHeader />

        <Table.Body>
          {this.props.people.map(person => (
            <TabRow
              person={person}
              key={person.id}
              onRawSelected={() => this.updateActiveRow(person.id)}
              isActive={this.state.activeId === person.id}
            />
          ))}
        </Table.Body>
      </Table>
    );
  }
}

export default DataTable;
