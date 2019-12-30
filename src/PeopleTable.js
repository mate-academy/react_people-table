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
    const { people, sortPeopleBy } = this.props;

    return (
      <table className="PeopleTable">
        <thead>
          <tr>
            <th onClick={() => sortPeopleBy('id')}>
              ID
            </th>
            <th onClick={() => sortPeopleBy('name')}>
              Name
            </th>
            <th onClick={() => sortPeopleBy('sex')}>
              Sex
            </th>
            <th onClick={() => sortPeopleBy('born')}>
              Born
            </th>
            <th onClick={() => sortPeopleBy('died')}>
              Died
            </th>
            <th>Mother</th>
            <th>Father</th>
            <th onClick={() => sortPeopleBy('age')}>
              Age
            </th>
            <th onClick={() => sortPeopleBy('century')}>
              Century
            </th>
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
  sortPeopleBy: PropTypes.func.isRequired,
};

export default PeopleTable;
