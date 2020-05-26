import React, { useState, useMemo } from 'react';
import { Person } from '../helpers/api';

import PersonRow from './PersonRow';
import { useHistory, useLocation } from 'react-router-dom';

type Props = {
  prepearedPeople: Person[];
};

const getVisiblePeople = (people: Person[], sortType: string) => {
  switch (sortType) {
    case 'Born':
      return [...people].sort((a, b) => a.born - b.born);

    case 'Died':
      return [...people].sort((a, b) => a.died - b.died);

    case 'Name':
      return [...people].sort((a, b) => a.name.localeCompare(b.name));

    case 'Sex':
      return [...people].sort((a, b) => a.sex.localeCompare(b.sex));

    default:
      return people;
  }
}

const PeopleTable: React.FC<Props> = ({ prepearedPeople }) => {
  const [sortType, setSortType] = useState('');
  const tableHeader: Array<string> = ['ID', 'Name', 'Sex', 'Born', 'Died', 'Mother', 'Father'];

  const history = useHistory();
  const location = useLocation();

  const searchParams = new URLSearchParams(location.search);
  const query: string = searchParams.get('query') || '';
  const sortBy: string = searchParams.get('sortBy') || '';

  const visibleTodos = useMemo(
    () => getVisiblePeople(prepearedPeople, sortType),
    [sortType, prepearedPeople]
  )

  const setSortParam = (title: string) => {
    setSortType(title)
    searchParams.set('sortBy', `${title}`);
    history.push({
      search: searchParams.toString(),
    });
  }

  return (
    <>
      <input
        type="text"
        value={query}
        className="search-field"
        placeholder="find person..."
        onChange={(event) => {
          searchParams.set('query', event.target.value);
          history.push({
            search: searchParams.toString(),
          })
        }}
      />
    <table className="people__table">
      <thead>
        <tr>
          {tableHeader.map(title => (
            <th key={title} className="table__header">
              <button
                type="button"
                className="table__button"
                onClick={() => setSortParam(title)}
              >
                {title}
                <span>
                  {sortBy === title ? '*' : ''}
                </span>
              </button>
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        <PersonRow people={visibleTodos} />
      </tbody>
    </table>
    </>

  );
}

export default PeopleTable;
