import React from 'react';
import PropTypes from 'prop-types';
import NewPerson from './NewPerson';

class PeopleTable extends React.Component {
  state = {
    selected: null,
  };

  render() {
    const { people } = this.props;
    const { selected } = this.state;

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
            <th>Century</th>
            <th>Mother</th>
            <th>Father</th>
            <th>Children</th>
          </tr>
        </thead>
        <tbody>
          {people.map(person => (
            <NewPerson
              key={person.id}
              person={person}
              selected={person.id === selected}
              onSelected={() => {
                this.setState({ selected: person.id });
              }}
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
