import React from 'react';
import { Person } from '../helpers/api';

import { useHistory, useParams } from 'react-router-dom';

type Props = {
  people: Person[];
}

const PersonRow: React.FC<Props> = ({ people }) => {
  const history = useHistory();
  const { personSlug } = useParams();

  const handleSelectPerson = (slug: string) => {
    history.push({
      pathname: `/people/${slug}`,
    })
  }

  return (
    <>
      {people.map(person => (
        <tr
          key={person.id}
          className={
            personSlug === person.slug
            ? "table__person table__person--active"
            : "table__person"
          }
          onClick={() => handleSelectPerson(person.slug)}
        >
          <td className="table__row table__row-id">
            {person.id}
          </td>
          <td className="table__row">
            {person.name}
          </td>
          <td
            className={
              person.sex === 'f'
                ? "table__row table__row-woman"
                : "table__row table__row-man"
            }
          >
            {person.sex}
          </td>
          <td className="table__row">
            {person.born}
          </td>
          <td className="table__row">
            {person.died}
          </td>
          <td className="table__row table__row-woman">
            {person.motherName || "\u2013"}
          </td>
          <td className="table__row table__row-man">
            {person.fatherName || "\u2013"}
          </td>
        </tr>
      ))}
    </>
  )
}

export default PersonRow;
