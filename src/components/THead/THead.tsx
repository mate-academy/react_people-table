import React, { useState } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import './THead.scss';

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
  const location = useLocation();
  const history = useHistory();
  const searchParams = new URLSearchParams(location.search);

  const [currentSortParam, setCurrentSortParam] = useState('');

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
              className="head__button"
              onClick={() => {
                searchParams.set('sortBy', param);

                if (searchParams.get('sortOrder') === 'asc'
                  && searchParams.get('sortBy') === currentSortParam) {
                  searchParams.set('sortOrder', 'desc');
                } else {
                  searchParams.set('sortOrder', 'asc');
                }

                history.push(
                  {
                    search: searchParams.toString(),
                  },
                );

                setCurrentSortParam(param);
              }}
            >
              {param}
            </button>
          </td>
        ))}
      </tr>
    </thead>
  );
};

export default THead;
