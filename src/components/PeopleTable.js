import React from 'react';
import PropTypes from 'prop-types';

import PersonInfo from './PersonInfo';

class PeopleTable extends React.Component {
  state = {
    selectedPersonId: null,
  };

  render() {
    const { people } = this.props;
    const { selectedPersonId } = this.state;

    return (
      <table className="people-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Sex</th>
            <th>Born</th>
            <th>Died</th>
            <th>Age</th>
            <th>Mother</th>
            <th>Father</th>
            <th>Children</th>
          </tr>
        </thead>
        <tbody>
          {people.map(person => (
            <PersonInfo
              person={person}
              key={person.id}
              selected={person.id === selectedPersonId}
              onSelected={() => this.setState({ selectedPersonId: person.id })}
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
