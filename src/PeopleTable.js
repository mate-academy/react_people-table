import React from 'react';
import PropTypes from 'prop-types';
import Person from './Person';

const PeopleTable = ({ people, history, location, match, selectText }) => {
  const search = new URLSearchParams(location.search);
  const sortBy = search.get('sortBy');
  let sortedPople = people;

  const sortTable = (column) => {
    if (search.get('sortBy') === column
      && search.get('sortOrder') === 'asc') {
      search.set('sortOrder', 'desc');
    } else {
      search.set('sortOrder', 'asc');
    }

    search.set('sortBy', column);
    history.push({ search: search.toString() });
  };

  if (sortBy) {
    const order = search.get('sortOrder') === 'desc' ? -1 : 1;

    sortedPople = [...people].sort((a, b) => {
      switch (typeof a[sortBy]) {
        case 'string':
          return a[sortBy].localeCompare(b[sortBy]) * order;
        case 'number':
          return (a[sortBy] - b[sortBy]) * order;
        default:
          return 0;
      }
    });
  }

  const head = [...Object.keys(sortedPople[0])];

  return (
    <table
      border="1"
      className="people-table"
    >
      <thead>
        <tr>
          {head.map(item => (
            <th
              key={item}
              onClick={() => sortTable(item)}
            >
              {item}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {<Person
          people={sortedPople}
          history={history}
          match={match}
          location={location}
          selectText={selectText}
        />}
      </tbody>
    </table>
  );
};

PeopleTable.propTypes = {
  people: PropTypes.arrayOf.isRequired,
  history: PropTypes.objectOf.isRequired,
  location: PropTypes.objectOf.isRequired,
  match: PropTypes.objectOf.isRequired,
  selectText: PropTypes.string.isRequired,
};

export default PeopleTable;
