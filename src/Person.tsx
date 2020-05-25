import React from 'react';
import cn from 'classnames';
import { PersonName } from './PersonName';

type Props = {
  person: PeopleTable;
};

export const Person: React.FC<Props> = ({ person }) => {
  return (
    <>
      <td>{person.id}</td>
      <PersonName person={person} />
      <td>{person.sex}</td>
      <td>{person.born}</td>
      <td>{person.died}</td>
      <td>{person.age}</td>
      <td className={
        cn({
          'Person--male': person.sex === 'm',
        })
      }
      >
          {person.father}
      </td>
      <td className={
        cn({
          'Person--female': person.sex === 'f',
        })
      }
      >
          {person.mother}
      </td>
      <td>{person.century}</td>
    </>
  );
};
