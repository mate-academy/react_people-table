import React from 'react';
import PropTypes from 'prop-types';
import Person from '../Person';

const PeopleTable = ({ people, history, location, match }) => {
  const search = new URLSearchParams(location.search);
  const sortBy = search.get('sortBy');
  // eslint-disable-next-line max-len
  const headers = ['id', 'name', 'sex', 'born', 'died', 'father', 'mother', 'age', 'century', 'children'];
  let sortedPeople = people;

  if (sortBy) {
    const order = search.get('sortOrder') === 'desc' ? -1 : 1;

    if (sortBy === 'name' || sortBy === 'sex') {
      sortedPeople = [...people]
        .sort((a, b) => a[sortBy].localeCompare(b[sortBy]) * order);
    } else {
      sortedPeople = [...people]
        .sort((a, b) => (a[sortBy] - b[sortBy]) * order);
    }
  }

  const handleClickToSort = (column) => {
    if (search.get('sortBy') === column
      && search.get('sortOrder') === 'asc') {
      search.set('sortOrder', 'desc');
    } else {
      search.set('sortOrder', 'asc');
    }

    search.set('sortBy', column);
    history.push({ search: search.toString() });
  };

  return (
    <table className="people-table">
      <thead className="people-table__heading">
        <tr>
          {headers.map(column => (
            <th key={column}>
              {column}
              {(column !== 'father'
              && column !== 'mother'
              && column !== 'children') && (
              <>
                {/* eslint-disable-next-line jsx-a11y/accessible-emoji */}
                <button
                  type="button"
                  className="people-table__sort"
                  onClick={() => handleClickToSort(column)}
                >
                  ↕️
                </button>
              </>
              )}
            </th>
          ))}
        </tr>
      </thead>
      <tbody className="people-table__main">
        {sortedPeople.map(personData => (
          <Person
            key={personData.name}
            person={personData}
            history={history}
            location={location}
            match={match}
          />
        ))}
      </tbody>
    </table>
  );
};

PeopleTable.propTypes = {
  people: PropTypes.arrayOf(PropTypes.object).isRequired,
  history: PropTypes.shape({}).isRequired,
  location: PropTypes.shape({}).isRequired,
  match: PropTypes.shape({}).isRequired,
};

export default PeopleTable;
