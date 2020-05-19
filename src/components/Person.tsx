import React from 'react';
import cN from 'classnames';
import { usePerson } from './hooks/usePerson';

export const Person = (props: Person) => {
  const {
    id,
    name,
    sex,
    born,
    died,
    age,
    century,
    father,
    mother,
    children,
    onSelect,
    path,
    location,
  } = usePerson(props);

  return (
    <tr
      className={cN({
        person: true,
        [`person--lived-in-${century}`]: true,
        'person--male': sex === 'm',
        'person--female': sex === 'f',
        'person--selected': location.pathname === path,
      })}
      onClick={onSelect}
    >
      <td>{id}</td>
      <td className={cN({
        'person--ancient': born < 1650,
      })}
      >
        {name}
      </td>
      <td>{sex}</td>
      <td>{born}</td>
      <td>{died}</td>
      <td className={cN({
        'person--long-liver': age >= 65,
      })}
      >
        {age}
      </td>
      <td>{century}</td>
      <td>{father}</td>
      <td>{mother}</td>
      <td>{children}</td>
    </tr>
  );
};
