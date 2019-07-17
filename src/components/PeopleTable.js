import React from 'react';
import PropTypes from 'prop-types';
import Person from './Person';

class PeopleTable extends React.Component {
  state = {
    selectedPersonId: null,
  };

  handleClick = (id) => {
    this.setState({ selectedPersonId: id });
  };

  render() {
    const { people } = this.props;
    const { selectedPersonId } = this.state;
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
          {people.map(person => (
            <Person
              person={person}
              key={person.name}
              selectedPersonId={person.id === selectedPersonId}
              handleClick={this.handleClick}
            />
          ))}
        </tbody>
      </table>
    );
  }
}

PeopleTable.propTypes = {
  people: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default PeopleTable;
