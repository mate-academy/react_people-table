import React from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import cn from 'classnames';
import { TableHeaderField } from '../../types/TableHeaderField';

type Props = {
  tableHeaderName: TableHeaderField
};

export const PeopleTableHeader: React.FC<Props> = ({ tableHeaderName }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const sortByValue = searchParams.get('sortBy');
  const sortOrderValue = searchParams.get('sortOrder');

  const handelSortFieldClick = (event: React.SyntheticEvent) => {
    event.preventDefault();

    if (sortByValue) {
      searchParams.set('sortBy', tableHeaderName);
    } else {
      searchParams.append('sortBy', tableHeaderName);
      searchParams.set('sortOrder', 'asc');
    }

    if (sortByValue === tableHeaderName) {
      const sortOrder = sortOrderValue === 'asc' ? 'desc' : 'asc';

      searchParams.set('sortOrder', sortOrder);
    } else {
      searchParams.set('sortOrder', 'asc');
    }

    setSearchParams(searchParams);
  };

  return (
    <th>
      {tableHeaderName.toUpperCase()}

      <Link
        to={{ search: `?sort=${tableHeaderName}` }}
        onClick={handelSortFieldClick}
      >
        <span className="icon">
          <i
            className={cn(
              'fas',
              {
                'fa-sort': sortByValue !== tableHeaderName,
                'fa-sort-up': sortByValue === tableHeaderName
                  && sortOrderValue === 'asc',
                'fa-sort-down': sortByValue === tableHeaderName
                  && sortOrderValue === 'desc',
              },
            )}
          />
        </span>
      </Link>
    </th>
  );
};
