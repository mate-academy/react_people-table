import React from 'react';
import PropTypes from 'prop-types';

import Person from './Person';

class PeopleTable extends React.Component {
  state = {
    selectedId: 0,
  }

  setSelectedId = (id) => {
    this.setState({
      selectedId: id,
    });
  }

  render() {
    const { people, sortPeople } = this.props;
    const { selectedId } = this.state;

    return (
      <table className="PeopleTable">
        <thead>
          <tr>
            <th onClick={() => sortPeople('id')}>ID</th>
            <th onClick={() => sortPeople('name')}>Name</th>
            <th onClick={() => sortPeople('sex')}>Sex</th>
            <th onClick={() => sortPeople('born')}>Born</th>
            <th onClick={() => sortPeople('died')}>Died</th>
            <th onClick={() => sortPeople('age')}>Age</th>
            <th onClick={() => sortPeople('century')}>Century</th>
            <th>Father</th>
            <th>Mother</th>
            <th>Children</th>
          </tr>
        </thead>
        <tbody>
          {people.map(
            person => (
              <Person
                key={person.id}
                person={person}
                selectedId={selectedId}
                select={this.setSelectedId}
              />
            )
          )}
        </tbody>
      </table>
    );
  }
}

PeopleTable.propTypes = {
  people: PropTypes.object,
  sortPeople: PropTypes.func,
}.isRequired;

export default PeopleTable;
