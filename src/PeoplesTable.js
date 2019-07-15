import React from 'react';

import Person from './Person';
import './PeopleTable.css'

class PeoplesTable extends React.Component  {
  state = {
    selectedPersonId: null,
  }

  changeSelectedPerson = (id) => {
    this.setState({selectedPersonId: id})
  }
  render () {
    const {peopleData} = this.props;
    return (
      <table className="PeopleTable">
        <thead>
          <tr>
            <th>id</th>
            <th>name</th>
            <th>sex</th>
            <th>born</th>
            <th>died</th>
            <th>mother</th>
            <th>father</th>
            <th>age</th>
            <th>century</th>
            <th>children</th>
          </tr>
        </thead>
        <tbody>
          {peopleData.map((person) => (
          <Person
            personDetails={person}
            key={person.name}
            handleSelect={this.changeSelectedPerson }
            selectedPersonId={this.state.selectedPersonId}
          />
          ))}
        </tbody>
      </table>
      );
    }
}
export default PeoplesTable;
