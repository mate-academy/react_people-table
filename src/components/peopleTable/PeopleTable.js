import React from 'react';
import PropTypes from 'prop-types';
import Person from '../person/Person';

class PeopleTable extends React.Component {
  state = {
    selectedLine: null,
  };

  selectLine = (id) => {
    this.setState({
      selectedLine: id,
    });
  };

  render() {
    const { people } = this.props;
    const { selectedLine } = this.state;

    return (
      <table className="ui table">
        <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Sex</th>
            <th>Born</th>
            <th>Died</th>
            <th>Age</th>
            <th>Century</th>
            <th>Mother</th>
            <th>Father</th>
          </tr>
        </thead>
        <tbody>
          {people.map(person => (
            <Person
              key={person.id}
              person={person}
              selectedLine={person.id === selectedLine}
              selectLine={this.selectLine}
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
