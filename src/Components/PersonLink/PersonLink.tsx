import React, { FC } from 'react';
import { NavLink } from 'react-router-dom';

interface PersonLinkProps {
  slug: string;
  name: string;
}

export const PersonLink: FC<PersonLinkProps> = (props) => {
  const { slug, name } = props;

  return (
    <NavLink
      to={{
        pathname: `/people/${slug}`,
        hash: slug,
      }}
    >
      {name}
    </NavLink>
  );
};
