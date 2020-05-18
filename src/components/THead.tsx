import React from 'react';

interface Props {
  keysForHeader: string[];
  sortBy: (sortParam: string, sortType: string) => void;
}

export const THead: React.FC<Props> = ({ keysForHeader, sortBy }) => {
  const sortedMethods: SortMethods = {
    id: 'number',
    name: 'string',
    sex: 'string',
    born: 'number',
    father: 'string',
    mother: 'string',
    died: 'number',
    age: 'number',
    century: 'number',
    children: 'string',
  };

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
