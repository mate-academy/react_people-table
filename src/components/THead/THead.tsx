import React from 'react';
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
