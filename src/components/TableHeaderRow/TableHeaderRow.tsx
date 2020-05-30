import React, { useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import ClassNames from 'classnames';
import './TableHeaderRow.css';

type Props = {
  headers: string[];
}

const TableHeaderRow: React.FC<Props> = ({ headers }) => {
  const history = useHistory();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const sortBy = searchParams.get('sortBy') || '';
  const sortOrder = searchParams.get('sortOrder') || '';
  const [currentColumn, setCurrentColumn] = useState<EventTarget>();

  const handleClickOnHeader = (event: React.MouseEvent<HTMLButtonElement>) => {
    const sortQuery = event.currentTarget.getAttribute('id')?.toLowerCase() || '';
    const trigger = currentColumn !== event.target;
    setCurrentColumn(event.target);

    if (sortOrder === 'desc' || !sortOrder
      || trigger) {
      searchParams.set('sortOrder', 'asc');
    } else {
      searchParams.set('sortOrder', 'desc');
    }

    searchParams.set('sortBy', sortQuery);

    history.push({
      search: searchParams.toString(),
    })
  }

  return (
    <tr className="people-table__headers">
      {headers.map((header: string) => (
        <td className="people-table__headers-column" key={header}>
          {['Name', 'Sex', 'Born', 'Died'].includes(header)
            ? <button
              onClick={handleClickOnHeader}
              className={ClassNames('people-table__sort-btn',
                {
                  'people-table__sort-btn--asc':
                    sortBy === header.toLowerCase()
                    && searchParams.get('sortOrder') === 'asc'
                },
                {
                  'people-table__sort-btn--desc':
                    sortBy === header.toLowerCase()
                    && searchParams.get('sortOrder') === 'desc'
                },
              )}
              id={header}
            >
              {header}
            </button>
            : <span className="people-table__header-name">{header}</span>
          }
        </td>
      ))}
    </tr>
  )
}

export default TableHeaderRow;
