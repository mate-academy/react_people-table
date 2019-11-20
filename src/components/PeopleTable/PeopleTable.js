import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './PeopleTable.css';
import Person from '../Person/Person';

class PeopleTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedPersonId: -1,
    };
  }

  selectPerson = (event) => {
    const selectedPersonId = +event.target.closest('.Person').dataset.personId;

    this.setState({ selectedPersonId });
  };

  render() {
    return (
      <table className="PeopleTable">
        <thead>
          <tr>
            <td>id</td>
            <td>name</td>
            <td>sex</td>
            <td>born</td>
            <td>died</td>
            <td>age</td>
            <td>century</td>
            <td>mother</td>
            <td>father</td>
          </tr>
        </thead>
        <tbody>
          {
            this.props.people.map(person => (
              <Person
                person={person}
                key={person.id}
                handleClick={this.selectPerson}
                selectedPersonId={this.state.selectedPersonId}
              />
            ))
          }
        </tbody>
      </table>
    );
  }
}

PeopleTable.defaultProps = {
  people: [],
};

PeopleTable.propTypes = {
  people: PropTypes.arrayOf(PropTypes.object),
};

export default PeopleTable;
