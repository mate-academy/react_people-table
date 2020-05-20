import React from 'react';
import { sortedMethods } from './sortedMethos'

interface Props {
  keysForHeader: string[];
  sortBy: (sortParam: string, sortType: string) => void;
}

export const THead: React.FC<Props> = ({ keysForHeader, sortBy }) => {

  return (
    <thead className="thead-light myThead">
      <tr>
        {keysForHeader.map(key => (
          <th
            scope="col"
            key={key}
            onClick={() => sortBy(key, sortedMethods[key])}
          >
            {key}
          </th>
        ))}
      </tr>
    </thead>
  );
};
