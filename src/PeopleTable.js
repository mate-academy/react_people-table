import React from 'react';
import PropTypes from 'prop-types';
import Person from './Person';

class PeopleTable extends React.Component {
  state = { selectedElement: null };

  handleClick = id => this.setState({ selectedElement: id });

  render() {
    const { people } = this.props;

    return (
      <table className="peopleTable">
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
          {people.map(
            singlePerson => (
              <Person
                key={singlePerson.name}
                person={singlePerson}
                selected={singlePerson.id === this.state.selectedElement}
                handleClick={this.handleClick}
              />
            )
          )}
        </tbody>
      </table>
    );
  }
}

PeopleTable.propTypes = {
  people: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default PeopleTable;
