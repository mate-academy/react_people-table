import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { PersonWithParents, Person } from './types';

export interface PersonNameProps {
  person: PersonWithParents | Person;
}

export const PersonName: React.FC<PersonNameProps> = ({ person }) => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);

  return (
    <Link
      to={{
        pathname: `/people/${person.slug}`,
        search: searchParams.toString(),
      }}
      className={person.sex === 'f' ? 'red' : 'blue'}
    >
      {person.name}
    </Link>
  );
};
