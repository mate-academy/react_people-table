import React from 'react';
import { Person } from './interfaces';

interface Props {
  setParams: (header: keyof Person) => (void)
}

export const TableHead: React.FC<Props> = ({ setParams }) => {
  return (
    <thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col" onClick={() => setParams('name')}>name</th>
      <th scope="col" onClick={() => setParams('sex')}>sex</th>
      <th scope="col" onClick={() => setParams('born')}>born</th>
      <th scope="col" onClick={() => setParams('died')}>died</th>
      <th scope="col" onClick={() => setParams('motherName')}>mother</th>
      <th scope="col" onClick={() => setParams('fatherName')}>father</th>
    </tr>
  </thead>
  )
}
