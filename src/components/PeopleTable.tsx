import React from 'react';
import {PersonRow} from './PersonRow';

interface Props {
  people: Person[];
  match: string;
}
const columnsName = ['NAME', 'SEX', 'BORN', 'DIED', 'FATHER', 'MOTHER'];

export const PeopleTable: React.FC<Props> = ({people}) => (

  <table className="PeopleTable">
    <thead className="PeopleTable-header">
    <tr>
      {columnsName.map( columns => <th>{columns}</th>)}
    </tr>
    </thead>
    <tbody>
    {people.map(person => <PersonRow
      person={person}
    />)}
    </tbody>
  </table>

);


