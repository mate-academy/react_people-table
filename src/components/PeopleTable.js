import React from 'react';
import PropTypes from 'prop-types';
import Person from './Person';

const PeopleTable = ({ people, handleSortBy }) => (
  <>

    <table className="PeopleTable">

      <thead>
        <tr className="PeopleTable__header">
          <th onClick={() => handleSortBy('index')}>Id</th>
          <th onClick={() => handleSortBy('name')}>Name</th>
          <th onClick={() => handleSortBy('sex')}>Sex</th>
          <th onClick={() => handleSortBy('born')}>Born</th>
          <th onClick={() => handleSortBy('died')}>Died</th>
          <th onClick={() => handleSortBy('age')}>Age</th>
          <th onClick={() => handleSortBy('century')}>Century</th>
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
    motherName: PropTypes.string,
    fatherName: PropTypes.string,
    map: PropTypes.func,
  })).isRequired,
  handleSortBy: PropTypes.func,
};

PeopleTable.defaultProps = {
  handleSortBy: () => {},
};

export default PeopleTable;
