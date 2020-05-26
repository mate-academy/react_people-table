import React from 'react';
import { Link } from 'react-router-dom';

type Props = {
  person: Person;
  id: number;
};

export const PersonName: React.FC<{person: Person}>
= ({ person }) => (<Link to={`/persons/${person.id}`}>{person.name}</Link>);

export const PersonRow: React.FC<Props> = ({ person, id }) => {
  const gender = person.sex === 'm' ? 'blue' : 'red';

  return (
    <tr className="table__row" key={`person${id.toString()}`}>
      <td className="table__data"><PersonName person={person} /></td>
      <td className={`table__data ${person.sex === 'm' || person.sex === 'f' ? gender : ''}`}>{person.sex}</td>
      <td className="table__data">{person.born}</td>
      <td className="table__data">{person.died}</td>
      <td className="table__data">{person.mother !== undefined ? (<PersonName person={person.mother} />) : person.motherName}</td>
      <td className="table__data">{person.father !== undefined ? (<PersonName person={person.father} />) : person.fatherName}</td>
    </tr>
  );
};
