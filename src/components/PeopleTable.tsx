import React from 'react';
import { PersonRow } from './PersonRow';

interface Props {
  people: Person[];

}
export const PeopleTable: React.FC<Props> = ({people}) => (

<table className="PeopleTable">
  <thead className="PeopleTable-header">
  <tr>
    <td> NAME </td>
    <td> SEX </td>
    <td> BORN </td>
    <td> DIE </td>
    <td> MOTHER </td>
    <td> FATHER </td>
  </tr>
  </thead>
  <tbody>
  {people.map(person => <PersonRow
    name={person.name}
    sex={person.sex}
    born={person.born}
    died={person.died}
    mother={person.motherName}
    father={person.fatherName}/>)}
  </tbody>
</table>

);


