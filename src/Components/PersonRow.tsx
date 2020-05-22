import React from 'react';
import { useHistory, useParams } from 'react-router-dom';
import cn from 'classnames';

type Props = {
  people: Person[];
};

export const PersonRow: React.FC<Props> = ({ people }) => {
  const history = useHistory();
  const { personSlug } = useParams();

  const handleSelectPerson = (personUrl: string) => {
    history.push({
      pathname: `/people/${personUrl}`,
    });
  };

  return (
    <>
      {people.map((person: Person) => (
        <tr
          className={cn('person', {
            'table-active': person.slug === personSlug,
          })}
          key={person.id}
          onClick={() => handleSelectPerson(person.slug)}
        >
          <th scope="row">{person.id}</th>
          <td>{person.name}</td>
          <td className={cn({
            person__male: person.sex === 'm',
            person__female: person.sex === 'f',
          })}
          >
            {person.sex}
          </td>
          <td>{person.born}</td>
          <td>{person.died}</td>
          <td className="person__female">{person.motherName}</td>
          <td className="person__male">{person.fatherName}</td>
        </tr>
      ))}
    </>
  );
};
