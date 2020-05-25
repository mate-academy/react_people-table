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

const THead = () => (
  <thead>
    <tr>
      {tHead.map(param => (
        <td
          key={param}
          className="head__cell"
        >
          {param}
        </td>
      ))}
    </tr>
  </thead>
);

export default THead;
