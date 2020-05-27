import React, { useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import './THead.scss';
import ClassNames from 'classnames';

const tHead: string[] = [
  'id',
  'name',
  'sex',
  'born',
  'died',
  'age',
  'century',
  'mother',
  'father',
];

const THead = () => {
  const [sortOrder, setSortOrder] = useState('');
  const history = useHistory();
  const location = useLocation();

  const searchParams = new URLSearchParams(location.search);


  return (
    <thead>
      <tr>
        {tHead.map(param => (
          <td
            key={param}
            className="head__cell"
          >
            <button
              type="button"
              className={ClassNames(
                'head__button',
                { head__button__active: searchParams.get('sortBy') === param },
              )}
              onClick={() => {
                searchParams.set('sortBy', param);
                if (searchParams.get('sortOrder') === 'asc'
                  && searchParams.get('sortBy') === sortOrder) {
                  searchParams.set('sortOrder', 'desc');
                } else {
                  searchParams.set('sortOrder', 'asc');
                }

                history.push({
                  search: searchParams.toString(),
                });
                setSortOrder(param);
              }}
            >
              {searchParams.get('sortBy') === param ? `${param}*` : param}
            </button>
          </td>
        ))}
      </tr>
    </thead>
  );
};

export default THead;
