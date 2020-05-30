import React from 'react';
import { useHistory, useLocation } from 'react-router-dom';

type Props = {
  name: string;
};

export const HeaderCell: React.FC<Props> = ({ header }) => {
  const history = useHistory();
  const location = useLocation();

  const searchParams = new URLSearchParams(location.search);
  const sortedBy = searchParams.get('sortBy');
  const sortOrder = searchParams.get('sortOrder') || '';
  const getSortOrder = (order: string) => {
    switch (order) {
      case 'asc':
        return 'desc';
      case 'desc':
        return 'asc';
      default:
        return 'asc';
    }
  };

  const setSortParam = () => {
    if (name === 'Mother' || name === 'Father') {
      return;
    }

    searchParams.set('sortBy', `${name}`);
    searchParams.set('sortOrder', `${getSortOrder(sortOrder)}`);
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
