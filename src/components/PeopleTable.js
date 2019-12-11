import React, { Component } from 'react';
import PropTypes from 'prop-types';

import PeopleRow from './PeopleRow';

const createTableHeaders = (people) => {
  if (people.length === 0) {
    return [{ name: 'There are no people' }];
  }

  return (
    Object.keys(people[0]).map(
      key => ({
        code: key, name: key[0].toUpperCase() + key.slice(1,),
      })
    )
  );
};

class PeopleTable extends Component {
  state = {
    selectedId: 0,
  }

  setSelectedId = (id) => {
    this.setState({
      selectedId: id,
    });
  };

  render = () => {
    const { people, sortTable } = this.props;
    const { selectedId } = this.state;
    const TABLE_HEADERS = createTableHeaders(people);

    return (
      <table className="people-table">
        <thead>
          <tr>
            {TABLE_HEADERS.map(({ name, code }) => (
              <th key={name}>
                <button
                  type="button"
                  value={code}
                  className="sort-button"
                  onClick={sortTable}
                >
                  {name}
                </button>
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {people.map(person => (
            <PeopleRow
              key={person.id}
              currentPerson={person}
              TABLE_HEADERS={TABLE_HEADERS}
              highLightPerson={this.setSelectedId}
              selectedPerson={selectedId}
            />
          ))}
        </tbody>
      </table>
    );
  };
}

PeopleTable.propTypes = {
  people: PropTypes.arrayOf(
    PropTypes.object
  ).isRequired,
  sortTable: PropTypes.func.isRequired,
};

export default PeopleTable;
