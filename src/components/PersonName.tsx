import React from 'react';
import cn from 'classnames';
import { Link } from 'react-router-dom';

type PersonNameType ={
  name: string;
  slug: string;
  sex: string;
};

export const PersonName: React.FC<PersonNameType> = ({ name, slug, sex }) => {
  return (
    <Link
      className={cn(
        `${slug}`,
        { male: sex === 'm' },
        { female: sex === 'f' },
      )}
      to={`/people/${slug}`}
    >
      {name}
    </Link>
  );
};
