import React from 'react';
import { useHistory, useParams, useLocation } from 'react-router-dom';
import { Person } from '../helpers/api';
import classnames from 'classnames';


type Props = {
  people: Person[];
};

const PersonRow: React.FC<Props> = ({ people }) => {
  const history = useHistory();
  const { personSlug } = useParams();
  const location = useLocation();

  const searchParams = new URLSearchParams(location.search);
  const query: string = searchParams.get('query') || '';

  const pattern = new RegExp(query, 'i');
  const visiblePeople = people.filter(p => pattern.test(p.name + p.motherName + p.fatherName))

  const handleSelectPerson = (slug: string) => {
    history.push({
      pathname: `/people/${slug}`,
    });
  };

  return (
    <>
      {visiblePeople.map(person => (
        <tr
          key={person.id}
          className={classnames({
            'table__person': true,
            'table__person--active': personSlug === person.slug,
          })}
          onClick={() => handleSelectPerson(person.slug)}
        >
          <td className="table__row table__row-id">
            {person.id}
          </td>
          <td className="table__row">
            {person.name}
          </td>
          <td
            className={classnames({
              'table__row': true,
              'table__row-woman': person.sex === 'f',
              'table__row-man': person.sex === 'm',
            })}
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
            {person.motherName || '\u2013'}
          </td>
          <td className="table__row table__row-man">
            {person.fatherName || '\u2013'}
          </td>
        </tr>
      ))}
    </>
  );
};

export default PersonRow;
