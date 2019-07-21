import React from 'react';

import Person from './Person';
import './PeopleTable.css';

class PeoplesTable extends React.Component {
  state = {
    selectedPersonId: null,
  }

  changeSelectedPerson = (id) => (
    this.setState({ selectedPersonId: id })
  );

  onHandleClick = (sortType) => (
    this.props.onHandleSortingBy(sortType)
  );

  render() {
    const { peopleData } = this.props;
    return (
      <table className="PeopleTable">
        <thead>
          <tr>
            <th onClick={() => this.onHandleClick('id')}>id</th>
            <th onClick={() => this.onHandleClick('name')}>name</th>
            <th onClick={() => this.onHandleClick('sex')}>sex</th>
            <th onClick={() => this.onHandleClick('born')}>born</th>
            <th onClick={() => this.onHandleClick('died')}>died</th>
            <th onClick={() => this.onHandleClick('mother')}>mother</th>
            <th onClick={() => this.onHandleClick('father')}>father</th>
            <th onClick={() => this.onHandleClick('age')}>age</th>
            <th onClick={() => this.onHandleClick('century')}>century</th>
            <th>children</th>
          </tr>
        </thead>
        <tbody>
          {peopleData.map(person => (
            <Person
              personDetails={person}
              key={person.name}
              handleSelect={this.changeSelectedPerson}
              selectedPersonId={this.state.selectedPersonId}
            />
          ))}
        </tbody>
      </table>
    );
  }
}
export default PeoplesTable;
