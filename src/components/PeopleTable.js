import React from 'react';
import PropTypes from 'prop-types';
import Person from './Person';

const PeopleTable = ({ people, handleSearch, handleSortBy }) => (
  <>
    <div className="search">
      <input
        type="search"
        placeholder="Input text for searching"
        className="search__input"
        autoComplete="off"
        onChange={handleSearch}
      />
    </div>

    <table className="PeopleTable">

      <thead>
        <tr className="PeopleTable__header">
          <th onClick={() => handleSortBy('index')}>Id</th>
          <th onClick={() => handleSortBy('name')}>Name</th>
          <th>Sex</th>
          <th onClick={() => handleSortBy('born')}>Born</th>
          <th onClick={() => handleSortBy('died')}>Died</th>
          <th onClick={() => handleSortBy('age')}>Age</th>
          <th>Century</th>
          <th>Mother</th>
          <th>Father</th>
          <th>Children</th>
        </tr>
      </thead>

      <tbody>
        {people.map(person => (
          <Person
            person={person}
            index={person.index}
            key={person.index}
          />
        ))}
      </tbody>

    </table>
  </>
);

PeopleTable.propTypes = {
  people: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string,
    sex: PropTypes.string,
    born: PropTypes.number,
    died: PropTypes.number,
    mother: PropTypes.string,
    father: PropTypes.string,
    map: PropTypes.func,
  })).isRequired,
  handleSearch: PropTypes.func.isRequired,
  handleSortBy: PropTypes.func.isRequired,
};

export default PeopleTable;
