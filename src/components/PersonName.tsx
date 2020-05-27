import React from 'react';
import cn from 'classnames';
import { Link, useLocation } from 'react-router-dom';

type PersonNameType ={
  name: string;
  slug: string;
  sex: string;
};


export const PersonName: React.FC<PersonNameType> = ({ name, slug, sex }) => {
  const location = useLocation();
  const params = new URLSearchParams(location.search).toString() || '';

  return (
    <Link
      className={cn(
        `${slug}`,
        { male: sex === 'm' },
        { female: sex === 'f' },
      )}
      to={`/people/${slug}?${params}`}
    >
      {name}
    </Link>
  );
};
