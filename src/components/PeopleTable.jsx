import React from 'react';
import PropTypes from 'prop-types';

import Person from './Person';

class PeopleTable extends React.Component {
  state = {
    selected: null,
  };

  render() {
    const { people, onSort } = this.props;
    const { selected } = this.state;

    return (
      <table className="people-table">
        <thead>
          <tr>
            <th className="pointer" onClick={() => onSort('id')}>ID</th>
            <th className="pointer" onClick={() => onSort('name')}>Name</th>
            <th className="pointer" onClick={() => onSort('sex')}>Sex</th>
            <th className="pointer" onClick={() => onSort('born')}>Born</th>
            <th className="pointer" onClick={() => onSort('died')}>Died</th>
            <th className="pointer" onClick={() => onSort('age')}>Age</th>
            <th
              className="pointer"
              onClick={() => onSort('century')}
            >
              Century
            </th>
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
  onSort: PropTypes.func,
};

PeopleTable.defaultProps = {
  onSort: () => {},
};

export default PeopleTable;
