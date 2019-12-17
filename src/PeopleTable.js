import React from 'react';
import PropTypes from 'prop-types';
import Person from './Person';

class PeopleTable extends React.Component {
  state = { selectedPerson: '' }

  selectPerson = (event, name) => {
    event.preventDefault();

    if (name !== this.state.selectedPerson) {
      this.setState({ selectedPerson: name });
    } else {
      this.setState({ selectedPerson: '' });
    }
  }

  render() {
    const { people, sortByNameAZ, sortByNameZA } = this.props;

    return (
      <table className="PeopleTable">
        <thead>
          <tr>
            <th>ID</th>
            <th>
              Name
              <a
                title="Sort A to Z order"
                href="#/"
                className="sorting"
                onClick={sortByNameAZ}
              >
                &#8639;
              </a>
              <a
                title="Sort Z to A order"
                href="#/"
                className="sorting"
                onClick={sortByNameZA}
              >
                &#8642;
              </a>
            </th>
            <th>Sex</th>
            <th>Born</th>
            <th>Died</th>
            <th>Mother</th>
            <th>Father</th>
            <th>Age</th>
            <th>Century</th>
          </tr>
        </thead>
        <tbody>
          {people.map(person => (
            <Person
              key={person.id}
              person={person}
              selectPerson={this.selectPerson}
              selectedPerson={this.state.selectedPerson}
            />
          ))}
        </tbody>
      </table>
    );
  }
}

PeopleTable.propTypes = {
  people: PropTypes.arrayOf(PropTypes.object).isRequired,
  sortByNameAZ: PropTypes.func.isRequired,
  sortByNameZA: PropTypes.func.isRequired,
};

export default PeopleTable;
