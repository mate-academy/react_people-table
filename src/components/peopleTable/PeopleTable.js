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
    const { people, sort } = this.props;
    const { selectedLine } = this.state;

    return (
      <table className="ui table celled fixed sortable">
        <thead>
          <tr>
            <th
              className="one wide"
              onClick={() => sort('id')}
            >
              Id
            </th>
            <th
              onClick={() => sort('name')}
            >
              Name
            </th>
            <th
              onClick={() => sort('sex')}
            >
              Sex
            </th>
            <th
              onClick={() => sort('born')}
            >
              Born
            </th>
            <th
              className="sort-btn"
              onClick={() => sort('died')}
            >
              Died
            </th>
            <th
              onClick={() => sort('age')}
            >
              Age
            </th>
            <th
              onClick={() => sort('century')}
            >
              Century
            </th>
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
