import React, { FC, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import className from 'classnames';
import { PeopleListInterface } from '../../interfaces';
import { PersonRow } from '../PersonRow/PersonRow';
import { peopleTableData } from './PeopleTableData';

import './PeopleTable.css';

interface PeopleTableProps {
  people: PeopleListInterface[];
}

export const PeopleTable: FC<PeopleTableProps> = ({ people }) => {
  const history = useHistory();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);

  const [selectedType, setSelectedType] = useState<string>('');

  const currentOrder = searchParams.get('sortOrder');
  const nextOrder = currentOrder === 'asc' ? 'desc' : 'asc';

  return (
    <table className="table table-hover">
      <thead>
        <tr>
          <th scope="col">№</th>
          {peopleTableData.map(cell => {
            const handleSort = () => {
              setSelectedType(cell.title);
              searchParams.set('sortBy', cell.title);
              searchParams.set('sortOrder', nextOrder);
              history.push({
                search: searchParams.toString(),
              });
            };

            const sortCellClassName = className('head-cell ', { 'table-dark': (selectedType === cell.title) });

            return (
              <th
                scope="col"
                className={sortCellClassName}
                onClick={handleSort}
              >
                {selectedType === cell.title && (
                  <img src="images/sort_both.png" alt="sort arrow" className="arrow" />
                )}
                {cell.title}
              </th>
            );
          })}
          <th scope="col">Mother</th>
          <th scope="col">Father</th>
        </tr>
      </thead>
      <PersonRow people={people} />
    </table>
  );
};
