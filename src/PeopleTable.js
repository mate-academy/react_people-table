import React from 'react';
import PropTypes from 'prop-types';
import Person from './Person';

class PeopleTable extends React.Component {
  state= {
    selectedPerson: 0,
  }

  handleSelect = (id) => {
    this.setState({
      selectedPerson: id,
    });
  }

  render() {
    const { selectedPerson } = this.state;
    const { sortName, sortId, people } = this.props;

    return (
      <div>
        <div className="search-block">
          <input
            type="search"
            placeholder="You my brother from another mother"
          />
        </div>
        <table className="PeopleTable">
          <thead>
            <tr>
              <th onClick={sortId}>ID</th>
              <th onClick={sortName}>Name</th>
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
              <Person
                person={person}
                key={people.id}
                selectedPerson={selectedPerson}
                handleSelect={this.handleSelect}
              />
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

PeopleTable.propTypes = {
  sortId: PropTypes.func.isRequired,
  sortName: PropTypes.func.isRequired,
  people: PropTypes.shape({
    id: PropTypes.number.isRequired,
  }).isRequired,
};

export default PeopleTable;
