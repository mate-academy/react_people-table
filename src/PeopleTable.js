import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import Person from './Person';
import './App.css';

class PeopleTable extends React.Component {
  state = {
    selectedPersonId: null,
  }

  render() {
    const { people } = this.props;
    const { selectedPersonId } = this.state;

    return (
      <table
        className={classNames({
          PeopleTable: true,
        })}
      >
        <thead>
          <tr className="PeopleTable__thead">
            <th>id</th>
            <th>name</th>
            <th>sex</th>
            <th>born</th>
            <th>died</th>
            <th>mother</th>
            <th>father</th>
            <th>age</th>
            <th>century</th>
            <th>children</th>
          </tr>
        </thead>
        <tbody>
          {people.map(person => (
            <Person
              person={person}
              key={person.id}
              selected={person.id === selectedPersonId}
              handleSelect={() => {
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
};

export default PeopleTable;
