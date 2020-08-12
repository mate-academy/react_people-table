import React from 'react';
// eslint-disable-next-line import/no-cycle
import { PersonName } from './PersonName';
import { PersonWithParents } from './types';

export interface PersonRowProps {
  person: PersonWithParents;
  url: string;
}

export const PersonRow: React.FC<PersonRowProps> = ({ person, url }) => {
  return (
    <tr className={person.slug === url.replace('/people/', '') ? 'highlight' : ''}>
      <td><PersonName person={person} /></td>
      <td>{person.sex}</td>
      <td>{person.born}</td>
      <td>{person.died}</td>
      <td>
        {(person.mother === undefined) ? person.motherName : <PersonName person={person.mother} />}
      </td>
      <td>
        {(person.father === undefined) ? person.fatherName : <PersonName person={person.father} />}
      </td>
    </tr>
  );
};
