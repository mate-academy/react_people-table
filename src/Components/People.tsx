import React from 'react';
import { Person } from './Person';

type Props = {
  people: Person[];

};

export const People: React.FC<Props> = ({ people }) => {
  return (
    <tbody className="table__body">
      {people.map((person, index) => (
        <Person
          info={person}
          id={index + 1}
          bornedBefore1650={person.born < 1650}
          isOlder65={person.age > 65}
          key={person.slug + person.name}
        />
      ))}
    </tbody>
  );
};
