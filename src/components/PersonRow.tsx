import React from 'react';
// import cn from 'classnames';
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

  return (
    <tr key={id}>
      <th>{id}</th>
      <th>
        <PersonName sex={sex} name={name} slug={slug} />
      </th>
      <th>{sex}</th>
      <th>{born}</th>
      <th>{died}</th>
      <th>
        {mother ? (
          <PersonName sex="f" name={motherName} slug={mother.slug} />
        ) : (<span>{motherName}</span>)}

      </th>
      <th>
        {father ? (
          <PersonName sex="m" name={fatherName} slug={father.slug} />
        ) : (<span>{fatherName}</span>)}
      </th>
    </tr>
  );
});
