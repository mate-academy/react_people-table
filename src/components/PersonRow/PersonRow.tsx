import React from 'react';
import { ModifiedPerson } from '../../helpers/api';
import ClassNames from 'classnames';
import './PersonRow.css';
import PersonName from '../PersonName/PersonName';
import { useParams } from 'react-router-dom';

type Props = {
  person: ModifiedPerson;
}

const PersonRow:React.FC<Props> = ({ person }) => {
  const personSex = person.sex === 'm' ? 'male' : 'female';
  const { slug } = useParams();

  return (
    <tr className={ClassNames('people-table__person',
      {'people-table__person--active': slug === person.slug},
      {'people-table__person--male': person.sex === 'm'},
      {'people-table__person--female': person.sex === 'f'})}>
      <td className="people-table__person-info">
        <PersonName person={person} />
      </td>
      <td className="people-table__person-info">{personSex}</td>
      <td className="people-table__person-info">{person.born}</td>
      <td className="people-table__person-info">{person.died}</td>
      <td className="people-table__person-info">
        {!person.motherName ? (
          <span>-</span>
        ) : (
          person.mother ? (
            <PersonName person={person.mother} />
         ) : (
           <span>{person.motherName}</span>
         )
        )}
      </td>
      <td className="people-table__person-info">
        {!person.fatherName ? (
          <span>-</span>
        ) : (
          person.father ? (
            <PersonName person={person.father} />
         ) : (
           <span>{person.fatherName}</span>
         )
        )}
      </td>
    </tr>
  )
}

export default PersonRow;
