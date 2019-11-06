import React, { Component } from 'react';
import Person from '../tablerow/TableRow';

export default class PeopleTable extends Component {
  state = {
    activeRow: 0,
  }

  selectOnClick = (id) => {
    this.setState({
      activeRow: id,
    })
  }

  render() {
    const { tableInfo } = this.props;
    return (
      <table className="table table-dark table-hover col-sm-10">
        <thead>
          <tr>
            <th scope="col">id</th>
            <th scope="col">Name</th>
            <th scope="col">Sex</th>
            <th scope="col">Born</th>
            <th scope="col">Died</th>
            <th scope="col">Century</th>
            <th scope="col">Age</th>
            <th scope="col">Mother</th>
            <th scope="col">Father</th>
            <th scope="col">Children</th>
          </tr>
        </thead>
        <tbody>
          {tableInfo.map(person => (
            <Person
              person={person}
              key={person.id}
              select={this.selectOnClick}
              index={this.state.activeRow}
            />
           ))}
        </tbody>
      </table>
    );
  }
}
