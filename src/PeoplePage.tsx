import React, { useEffect, useState } from 'react';

const getPeople = fetch('/api/people.json').then(r => r.json());

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);

  useEffect(() => { getPeople.then(setPeople) }, []);

  return (
    <ul>
      {people.map(person => (
        <li key={person.slug} >
          {person.name}
        </li>
      ))}
    </ul>
  );
};
