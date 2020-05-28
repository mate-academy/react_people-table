import React from 'react';
import { ModifiedPerson } from '../../helpers/api';
import ClassNames from 'classnames';
import './PersonRow.css';

type Props = {
  person: ModifiedPerson;
}

const PersonRow:React.FC<Props> = ({ person }) => {
  const father = person.father?.name || person.fatherName;
  const mother = person.mother?.name || person.motherName;
  const personSex = person.sex === 'm' ? 'male' : 'female';

  return (
    <tr className={ClassNames('people-table__person',
      {'people-table__person--male': personSex === 'male'},
      {'people-table__person--female': personSex === 'female'})}>
      <td className="people-table__person-info">{person.name}</td>
      <td className="people-table__person-info">{personSex}</td>
      <td className="people-table__person-info">{person.born}</td>
      <td className="people-table__person-info">{person.died}</td>
      <td className="people-table__person-info">{mother}</td>
      <td className="people-table__person-info">{father}</td>
    </tr>
  )
}

export default PersonRow;
