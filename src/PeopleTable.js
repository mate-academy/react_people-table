import React from 'react';
import PropTypes from 'prop-types';
import Person from './Person';

class PeopleTable extends React.Component {
  state = {
    selectedPersonId: null,
  };

  render() {
    const { people, onSortFieldChanged } = this.props;
    const { selectedPersonId } = this.state;

    return (
      <table className="PeopleTable" style={{ borderCollapse: 'colapse' }}>
        <thead>
          <tr>
            <th onClick={() => onSortFieldChanged('id')}>ID</th>
            <th onClick={() => onSortFieldChanged('name')}>Name</th>
            <th onClick={() => onSortFieldChanged('sex')}>Sex</th>
            <th onClick={() => onSortFieldChanged('born')}>Born</th>
            <th onClick={() => onSortFieldChanged('died')}>Died</th>
            <th onClick={() => onSortFieldChanged('age')}>Age</th>
            <th onClick={() => onSortFieldChanged('century')}>Century</th>
            <th>Mother</th>
            <th>Father</th>
            <th>Children</th>
          </tr>
        </thead>
        <tbody>
          {people.map(person => (
            <Person
              key={person.id}
              person={person}
              selected={person.id === selectedPersonId}
              onSelected={() => {
                this.setState({ selectedPersonId: person.id });
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
  onSortFieldChanged: PropTypes.func,
};

PeopleTable.defaultProps = {
  onSortFieldChanged: () => {},
};

export default PeopleTable;
