import React, { useMemo } from 'react';
import classnames from 'classnames';
import { Person } from '../helpers/api';

import PersonRow from './PersonRow';
import SerchField from './SearchField';
import { useHistory, useLocation } from 'react-router-dom';

type Props = {
  prepearedPeople: Person[];
};

const PeopleTable: React.FC<Props> = ({ prepearedPeople }) => {
  const tableHeader: Array<string> = ['ID', 'Name', 'Sex', 'Born', 'Died', 'Mother', 'Father'];

  const history = useHistory();
  const location = useLocation();

  const searchParams = new URLSearchParams(location.search);
  const sortBy: string = searchParams.get('sortBy') || '';
  const sortOrder: string =  searchParams.get('sortOrder') || '';

  useMemo(() => {
    const sortingType = sortBy.toLowerCase();
    switch (sortOrder) {
      case 'asc':
        switch (sortingType) {
          case 'born':
          case 'died':
            prepearedPeople.sort((a, b) => a[sortingType] - b[sortingType]); break;

          case 'name':
          case 'sex':
            prepearedPeople.sort((a, b) => a[sortingType].localeCompare(b[sortingType])); break;

          default:
        }
        break;
      case 'desc':
        switch (sortingType) {
          case 'born':
          case 'died':
            prepearedPeople.sort((a, b) => b[sortingType] - a[sortingType]); break;

          case 'name':
          case 'sex':
            prepearedPeople.sort((a, b) => b[sortingType].localeCompare(a[sortingType])); break;

          default:
        }
        break;
      default:
    }
  },
  [prepearedPeople, sortOrder, sortBy]
  );

  const setSortParam = (title: string) => {
    const titles = ['Born', 'Died', 'Name', 'Sex'];
    const sortOrderParam = (sortOrder === 'asc') ? 'desc' : 'asc';

    if (titles.includes(title)) {
      searchParams.set('sortBy', `${title}`);
      searchParams.set('sortOrder', `${sortOrderParam}`);

      history.push({
        search: searchParams.toString(),
      });
    }
  }

  return (
    <>
      <SerchField />
      <table className="people__table">
        <thead>
          <tr>
            {tableHeader.map(title => (
              <th key={title} className="table__header">
                <button
                  type="button"
                  className="table__button"
                  onClick={() => (
                    setSortParam(title)
                  )}
                >
                  {title}
                  <span>
                    {sortBy === title ? <i className={classnames({
                      "arrow down": sortOrder === 'asc',
                      "arrow up": sortOrder === 'desc',
                    })}
                    /> : ''}
                  </span>
                </button>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          <PersonRow people={prepearedPeople} />
        </tbody>
      </table>
    </>

  );
}

export default PeopleTable;
