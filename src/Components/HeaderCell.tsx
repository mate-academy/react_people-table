import React from 'react';
import { useHistory, useLocation } from 'react-router-dom';

type Props = {
  name: string;
};

export const HeaderCell: React.FC<Props> = ({ name }) => {
  const history = useHistory();
  const location = useLocation();

  const searchParams = new URLSearchParams(location.search);
  const sortedBy = searchParams.get('sortBy');
  const setSortParam = () => {
    if (name === 'Mother' || name === 'Father') {
      return;
    }

    searchParams.set('sortBy', `${name}`);
    history.push({
      search: searchParams.toString(),
    });
  };

  return (
    <th
      className="table__header-cell"
      onClick={() => {
        setSortParam();
      }}
    >
      {name}
      {name === sortedBy && '*'}
    </th>
  );
};
