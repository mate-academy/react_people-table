import React from 'react';
import Person from './Person';
import './App.css';

class PeopleTable extends React.Component {
  state = {
    selectedPersonId: null,
  };

  render() {
    const { people, onSortFieldChanged } = this.props;
    const { selectedPersonId } = this.state;
    return (
      <table className="PeopleTable">
        <thead>
          <tr>
            <th onClick={() => onSortFieldChanged('id')}>Id</th>
            <th onClick={() => onSortFieldChanged('name')}>Name</th>
            <th onClick={() => onSortFieldChanged('sex')}>Sex</th>
            <th onClick={() => onSortFieldChanged('born')}>Born</th>
            <th onClick={() => onSortFieldChanged('died')}>Died</th>
            <th>Mother</th>
            <th>Father</th>
            <th onClick={() => onSortFieldChanged('age')}>Age</th>
            <th onClick={() => onSortFieldChanged('century')}>Century</th>
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
