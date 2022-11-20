import React from 'react';
import { useParams } from 'react-router-dom';
import cn from 'classnames';
import { PersonName } from '../PersonName';
import { Person } from '../../types/Person';

type Props = {
  person: Person,
};

export const PersonRow: React.FC<Props> = ({ person }) => {
  const { selectedPerson } = useParams();

  const isFatherObj = 'father' in person;
  const isMotherObj = 'mother' in person;

  return (
    <tr
      key={person.slug}
      data-cy="person"
      className={cn(
        'Person',
        { 'has-background-warning': person.slug === selectedPerson },
      )}
    >
      <td>
        <PersonName person={person} />
      </td>

      <td>{person.sex}</td>
      <td>{person.born}</td>
      <td>{person.died}</td>

      <td>
        {isMotherObj
          ? <PersonName person={person.mother} />
          : person.motherName || '-'}
      </td>

      <td>
        {isFatherObj
          ? <PersonName person={person.father} />
          : person.fatherName || '-'}
      </td>
    </tr>
  );
};
