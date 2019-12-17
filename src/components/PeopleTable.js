import React from 'react';
import PropTypes from 'prop-types';
import Person from './Person';

class PeopleTable extends React.Component {
  state = {
    selectedRow: 0,
    sortUpBy: '',
    sortDownBy: '',
  }

  selectRow = (selectedRow) => {
    this.setState({ selectedRow });
  }

  sortUp = (sortUpBy) => {
    this.setState({
      sortUpBy,
      sortDownBy: '',
    });
  }

  sortDown = (sortDownBy) => {
    this.setState({
      sortDownBy,
      sortUpBy: '',
    });
  }

  render() {
    const { selectedRow, sortUpBy, sortDownBy } = this.state;
    let { people } = this.props;

    if (sortUpBy) {
      if (sortUpBy === 'name' || sortUpBy === 'sex') {
        people = [...people]
          .sort((a, b) => a[sortUpBy].localeCompare(b[sortUpBy]));
      } else {
        people = [...people]
          .sort((a, b) => a[sortUpBy] - b[sortUpBy]);
      }
    } else if (sortDownBy) {
      if (sortDownBy === 'name' || sortDownBy === 'sex') {
        people = [...people]
          .sort((a, b) => -a[sortDownBy].localeCompare(b[sortDownBy]));
      } else {
        people = [...people]
          .sort((a, b) => b[sortDownBy] - a[sortDownBy]);
      }
    }

    return (
      <table className="people-table">
        <thead className="people-table__heading">
          <tr>
            {[
              'id',
              'name',
              'sex',
              'born',
              'died',
              'father',
              'mother',
              'age',
              'century',
              'children',
            ].map(column => (
              <th key={column}>
                {column}
                {(column !== 'father'
                  && column !== 'mother'
                  && column !== 'children') && (
                  <>
                    <button
                      type="button"
                      className="people-table__sort"
                      onClick={() => this.sortUp(column)}
                    >
                      <span
                        role="img"
                        aria-label="Arrow up"
                      >
                        ⬆️
                      </span>
                    </button>

                    <button
                      className="people-table__sort"
                      type="button"
                      onClick={() => this.sortDown(column)}
                    >
                      <span
                        role="img"
                        aria-label="Arrow down"
                      >
                        ⬇️
                      </span>
                    </button>
                  </>
                )}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="people-table__main">
          {people.map(personData => (
            <Person
              key={personData.name}
              person={personData}
              selectedRow={selectedRow}
              selectRow={this.selectRow}
            />
          ))}
        </tbody>
      </table>
    );
  }
}

PeopleTable.propTypes = {
  people: PropTypes.arrayOf(PropTypes.shape({ name: PropTypes.string }))
    .isRequired,
};

export default PeopleTable;
