import React from 'react';
import { Person } from '../helpers/api';

import PersonRow from './PersonRow';

type Props = {
  prepearedPeople: Person[];
}

const PeopleTable: React.FC<Props> = ({ prepearedPeople }) => (
  <table className="people__table">
  <thead>
    <tr>
      <th className="table__header">ID</th>
      <th className="table__header">Name</th>
      <th className="table__header">Sex</th>
      <th className="table__header">Born</th>
      <th className="table__header">Died</th>
      <th className="table__header">Mother</th>
      <th className="table__header">Father</th>
    </tr>
  </thead>
  <tbody>
    <PersonRow people={prepearedPeople}  />
  </tbody>
</table>
)

export default PeopleTable;
