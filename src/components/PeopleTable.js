import React from 'react';
import PropTypes from 'prop-types';
import NewPerson from './NewPerson';

class PeopleTable extends React.Component {
  state = {
    selected: null,
  };

  render() {
    const { people, handleSort } = this.props;
    const { selected } = this.state;

    return (
      <table className="people-table">
        <thead>
          <tr>
            <th className="sort-btn" onClick={() => handleSort('id')}>ID</th>
            <th className="sort-btn" onClick={() => handleSort('id')}>Name</th>
            <th className="sort-btn" onClick={() => handleSort('id')}>Sex</th>
            <th className="sort-btn" onClick={() => handleSort('id')}>Born</th>
            <th className="sort-btn" onClick={() => handleSort('id')}>Died</th>
            <th className="sort-btn" onClick={() => handleSort('id')}>Age</th>
            <th className="sort-btn" onClick={() => handleSort('id')}>
              Century
            </th>
            <th className="sort-btn" onClick={() => handleSort('id')}>
              Mother
            </th>
            <th className="sort-btn" onClick={() => handleSort('id')}>
              Father
            </th>
            <th className="sort-btn" onClick={() => handleSort('id')}>
              Children
            </th>
          </tr>
        </thead>
        <tbody>
          {people.map(person => (
            <NewPerson
              key={person.id}
              person={person}
              selected={person.id === selected}
              onSelected={() => {
                this.setState({ selected: person.id });
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
  handleSort: PropTypes.func,
};

PeopleTable.defaultProps = {
  handleSort: () => {},
};

export default PeopleTable;
