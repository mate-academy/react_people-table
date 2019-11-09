import React from 'react';
import Person from '../Person/Person';

class PersonTable extends React.Component {
  state = {
    personIdSelect: null,
  };

  selectPerson = (event) => {
    this.setState({
      personIdSelect: +event.currentTarget.dataset.personId,
    });
  };

  render() {
    const { people } = this.props;
    const { personIdSelect } = this.state;

    return (
      <table >
        <thead>
        <tr>
          <th>Id</th>
          <th>Name</th>
          <th>Sex</th>
          <th>Age</th>
          <th>Born</th>
          <th>Died</th>
          <th>Century</th>
          <th>Mother</th>
          <th>Father</th>
          <th>Children</th>
        </tr>
        </thead>
        <tbody>
        {people.map((person, index) => (
          <Person
            key={Math.random()}
            person={person}
            personId={index + 1}
            selectPerson={this.selectPerson}
            selectedId={personIdSelect}
          />
          ))}
        </tbody>
      </table>
    );
  }
}

export default PersonTable;
