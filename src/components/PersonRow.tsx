import React from 'react';
import cn from 'classnames';
import { PersonName } from './PersonName';

type PersonRowProps = {
  person: PersonCompleted;
  index: number;
  personName: string;
};

export const PersonRow = ({ person, index, personName }: PersonRowProps) => {
  const {
    name, sex, born, died, motherName, mother, father, fatherName, slug,
  } = person;

  return (
    <tr className={cn('person',
      { active: personName === slug })}
    >
      <th>{index + 1}</th>
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
};
