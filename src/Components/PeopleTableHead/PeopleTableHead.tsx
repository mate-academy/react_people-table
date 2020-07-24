import React, { FC, useState } from 'react';
import { useLocation, useHistory } from 'react-router';

const tableHead: string[] = [
  'Name',
  'Sex',
  'Born',
  'Died',
];

export const PeopleTableHead: FC = () => {
  const [currentParam, setCurrentParam] = useState('');
  const history = useHistory();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);

  const style = { background: '#a6a6d3' };

  const sortedByParams = (param: string): void => {
    setCurrentParam(param);
    let sortOrder = (searchParams.get('sortOrder') === 'asc' ? 'desc' : 'asc');

    if (searchParams.get('sortBy') !== param) {
      sortOrder = 'asc';
    }

    searchParams.set('sortBy', param);
    searchParams.set('sortOrder', sortOrder);
    history.push({
      search: searchParams.toString(),
    });
  };

  return (
    <thead>
      <tr>
        {tableHead.map(head => {
          const styleActiveTitle = (currentParam === head ? style : {});

          return (
            <th
              style={styleActiveTitle}
              onClick={() => sortedByParams(head)}
              key={head}
              scope="col"
            >
              {head}
              <img
                src="images/sort_both.png"
                alt="sorting arrows"
              />
            </th>
          );
        })}
        <th
          scope="col"
        >
          Mother
        </th>
        <th
          scope="col"
        >
          Father
        </th>
      </tr>
    </thead>
  );
};
