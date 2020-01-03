import React, { memo } from 'react';
import { useHistory, useRouteMatch, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import PersonRow from './PersonRow';
import { TABLE_HEADERS } from './const';

const PeopleTable = ({ people, handleSortClick }) => {
  const location = useLocation();
  const history = useHistory();
  const match = useRouteMatch();

  const selectRow = (id) => {
    history.push({
      pathname: `/people/${people
        .find(person => id === person.id).name
        .toLowerCase()
        .replace(/\s/g, '-')}`,
      search: location.search,
    });
  };

  return (
    people.length > 0 && (
      <table className="people__table">
        <thead>
          <tr>
            {TABLE_HEADERS.map(header => (
              <th
                key={header.code}
                onClick={() => {
                  handleSortClick(header.code);
                }}
              >
                {header.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {people.map(
            person => (
              <PersonRow
                key={person.name}
                person={person}
                headers={TABLE_HEADERS}
                selected={person.name
                  .toLowerCase()
                  .replace(/\s/g, '-') === match.params.person}
                selectRow={selectRow}
              />
            )
          )}
        </tbody>
      </table>
    )
  );
};

PeopleTable.propTypes = {
  people: PropTypes.arrayOf(PropTypes.object).isRequired,
  sortFields: PropTypes.func.isRequired,
};

export default memo(PeopleTable);
