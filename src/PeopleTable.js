import React, { useEffect } from 'react';
import { useHistory, useRouteMatch, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import PersonRow from './PersonRow';

const TABLE_HEADERS = [
  {
    code: 'id',
    label: 'Id',
    type: 'number',
  },
  {
    code: 'name',
    label: 'Name',
    type: 'string',
  },
  {
    code: 'sex',
    label: 'Sex',
    type: 'string',
  },
  {
    code: 'born',
    label: 'Born',
    type: 'number',
  },
  {
    code: 'died',
    label: 'Died',
    type: 'number',
  },
  {
    code: 'age',
    label: 'Age',
    type: 'number',
  },
  {
    code: 'century',
    label: 'Century',
    type: 'number',
  },
  {
    code: 'mother',
    label: 'Mother',
    type: 'string',
  },
  {
    code: 'father',
    label: 'Father',
    type: 'string',
  },
];

const PeopleTable = ({ people, sortFields, sortData }) => {
  const location = useLocation();
  const history = useHistory();
  const match = useRouteMatch();
  const search = new URLSearchParams(location.search);
  const sortBy = search.get('sortBy');
  const sortOrder = search.get('sortOrder');

  useEffect(() => {
    if (sortBy) {
      sortFields(
        sortBy,
        TABLE_HEADERS.find(h => h.code === sortBy).type, sortOrder
      );
    }
  }, []);

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
                  sortFields(header.code, header.type);
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

export default React.memo(PeopleTable);
