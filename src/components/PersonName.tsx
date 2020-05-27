import React from 'react';
import cn from 'classnames';
import { Link } from 'react-router-dom';

type PersonNameType = {
  name: string;
  slug: string;
  sex: string;
};

export const PersonName: React.FC<PersonNameType> = ({ name, slug, sex }) => {
  return (
    <Link
      className={cn(
        `${slug}`,
        { person__male: sex === 'm' },
        { person__female: sex === 'f' },
      )}
      to={`/people/${slug}`}
    >
      {name}
    </Link>
  );
};
