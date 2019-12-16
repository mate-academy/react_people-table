import React from 'react';
import PropTypes from 'prop-types';
import Person from './Person';

class PeopleTable extends React.Component {
  state = {
    personSelected: 0,
  };

  clickHandler = id => (
    this.setState({ personSelected: id })
  );

  render() {
    const { people, highlight, sortHandler } = this.props;
    const { personSelected } = this.state;
    const head = [
      'id',
      'name',
      'sex',
      'born',
      'died',
      'father',
      'mother',
      'age',
      'century'];

    return (
      <table className="PeopleTable">
        <thead>
          <tr>
            {head.map(item => (
              <th
                key={item}
                className="PeopleTable__head-item"
              >
                <button
                  className="button"
                  type="button"
                  onClick={() => sortHandler(item)}
                >
                  {item}
                </button>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {people.map(person => (
            <Person
              key={person.id}
              person={person}
              highlightedPart={highlight}
              clickHandler={this.clickHandler}
              personSelected={personSelected}
            />
          ))
          }
        </tbody>
      </table>
    );
  }
}

PeopleTable.propTypes = {
  people: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired,
  highlight: PropTypes.string.isRequired,
  sortHandler: PropTypes.func.isRequired,
};

export default PeopleTable;
