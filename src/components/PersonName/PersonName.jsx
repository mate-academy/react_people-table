import React from 'react';
import { NavLink, Link } from 'react-router-dom';

export const PersonName = ({ name, slug }) => {

  return (
    <Link
      to={{ pathname: `/peoples/${slug}` }}
      exact
    >
      {name}
    </Link>
  );
};
