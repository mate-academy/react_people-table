import React from 'react';
import Person from './Person';
import './App.css';

class PeopleTable extends React.Component {
  state = {
    selectedPersonId: null,
  };

  render() {
    const { people } = this.props;
    const { selectedPersonId } = this.state;
    return (
      <table className="PeopleTable">
        <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Sex</th>
            <th>Born</th>
            <th>Died</th>
            <th>Mother</th>
            <th>Father</th>
            <th>Age</th>
            <th>Century</th>
            <th>Children</th>
          </tr>
        </thead>
        <tbody>
          {people.map(person => (
            <Person
              person={person}
              key={person.id}
              isSelected={person.id === selectedPersonId}
              handleSelect={() => {
                this.setState({ selectedPersonId: person.id });
              }}
            />
          ))}
        </tbody>
      </table>
    );
  }
}

export default PeopleTable;
