import React from 'react';
import PropTypes from 'prop-types';

import Person from './Person';

class PeopleTable extends React.Component {
  state = {
    selected: null,
  };

  render() {
    const { people, handleSort } = this.props;
    const { selected } = this.state;

    return (
      <table className="people-table">
        <thead>
          <tr>
            <th className="pointer" onClick={() => handleSort('id')}>ID</th>
            <th className="pointer" onClick={() => handleSort('name')}>Name</th>
            <th className="pointer" onClick={() => handleSort('sex')}>Sex</th>
            <th className="pointer" onClick={() => handleSort('born')}>Born</th>
            <th className="pointer" onClick={() => handleSort('died')}>Died</th>
            <th className="pointer" onClick={() => handleSort('age')}>Age</th>
            <th
              className="pointer"
              onClick={() => handleSort('century')}
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
  handleSort: PropTypes.func,
};

PeopleTable.defaultProps = {
  handleSort: () => {},
};

export default PeopleTable;
