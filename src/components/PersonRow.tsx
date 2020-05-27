import React from 'react';
import cn from 'classnames';
import { useParams, useHistory } from 'react-router-dom';
import { PersonName } from './PersonName';

type PersonRowProps = {
  person: PersonWithParents;
};

export const PersonRow: React.FC<PersonRowProps> = (({ person }) => {
  const {
    id,
    name,
    sex,
    born,
    died,
    motherName,
    fatherName,
    mother,
    father,
    slug,
  } = person;

  const history = useHistory();
  const { personSlug } = useParams();


  const handleSelectPerson = (perSlug: string) => {
    history.push({
      pathname: `/people/${perSlug}`,
    });
  };

  return (
    <tr
      key={id}
      className={cn('person', {
        'person--active': person.slug === personSlug,
      })}
      onClick={() => handleSelectPerson(person.slug)}
    >
      <th>{id}</th>
      <th>
        <PersonName sex={sex} name={name} slug={slug} />
      </th>
      <th
        className={cn({
          person__male: person.sex === 'm',
          person__female: person.sex === 'f',
        })}
      >
        {sex}
      </th>
      <th>{born}</th>
      <th>{died}</th>
      <th className="person__female">
        {mother ? (
          <PersonName sex="f" name={motherName} slug={mother.slug} />
        ) : (<span>{motherName}</span>)}

      </th>
      <th className="person__male">
        {father ? (
          <PersonName sex="m" name={fatherName} slug={father.slug} />
        ) : (<span>{fatherName}</span>)}
      </th>
    </tr>
  );
});
