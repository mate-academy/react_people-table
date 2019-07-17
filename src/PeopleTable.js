import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import Person from './Persone';
import './PeopleTable.css';

class PeopleTable extends React.Component {
  state = {
    selectedPersonId: null,
  };

  render() {
    const { peopleData } = this.props;
    const { selectedPersonId } = this.state;

    return (
      <table
        className={classnames({
          PeopleTable: true,
        })}
      >
        <thead>
          <tr>
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
          {peopleData.map(person => (
            <Person
              person={person}
              key={person.name}
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
  peopleData: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default PeopleTable;
