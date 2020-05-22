import React from 'react';
import { Person } from './Person';

type Props = {
  people: Person[];
};

export const People: React.FC<Props> = ({ people }) => {
  return (
    <tbody>
      {people.map((person, index) => (
        <Person
          info={person}
          id={index + 1}

        />
      ))}
    </tbody>
  );
};
