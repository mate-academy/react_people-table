import React from 'react';
import { useHistory, useLocation, useParams } from 'react-router-dom';
import cn from 'classnames';

type Props = {
  people: Person[];
};

export const PersonRow: React.FC<Props> = ({ people }) => {
  const history = useHistory();
  const location = useLocation();
  const { personName } = useParams();

  return (
    <>
      {people.map(person => (
        <tr
          className={cn('personRow', {
            personRow__active: person.slug === personName,
          })}
          key={person.id}
          onClick={() => {
            history.push({
              pathname: `/people/${person.slug}`,
              search: location.search,
            });
          }}
        >
          <td
            className={cn({
              person__woman: person.sex === 'f',
              person__man: person.sex === 'm',
            })}
          >
            {person.name}
          </td>
          <td>{person.sex}</td>
          <td>{person.born}</td>
          <td>{person.died}</td>
          <td
            className={cn(
              'person__mother', {
                notFount: person.mother === 'NOT FOUND',
              },
            )}
          >
            {person.mother}
          </td>
          <td
            className={cn(
              'person__father', {
                notFount: person.father === 'NOT FOUND',
              },
            )}
          >
            {person.father}
          </td>
        </tr>
      ))}
    </>
  );
};
