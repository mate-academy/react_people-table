import React from 'react';
import { Link, useParams } from 'react-router-dom';

type Props = {
  person: Person;
};

export const PersonName: React.FC<Props>
= ({ person }) => (<Link to={`/people/${person.slug}`}>{person.name}</Link>);

export const PersonRow: React.FC<Props> = ({ person }) => {
  const gender = person.sex === 'm' ? 'blue' : 'red';
  const { slug } = useParams();

  return (
    <tr className={person.slug === slug ? 'table__row is-selected' : 'table__row'} key={person.slug}>
      <td className="table__data"><PersonName person={person} /></td>
      <td className={`table__data ${person.sex === 'm' || person.sex === 'f' ? gender : ''}`}>
        {person.sex}
      </td>
      <td className="table__data">{person.born}</td>
      <td className="table__data">{person.died}</td>
      <td className="table__data">{person.mother !== undefined ? (<PersonName person={person.mother} />) : person.motherName}</td>
      <td className="table__data">{person.father !== undefined ? (<PersonName person={person.father} />) : person.fatherName}</td>
    </tr>
  );
};
