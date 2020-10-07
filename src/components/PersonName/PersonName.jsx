import React, { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import './PersonName.scss';
import classNames from 'classnames';

export const PersonName = ({ name, match, slug, sex, location, setUrl }) => {
  useEffect(() => {
   setUrl(match.params.id)
  }, [match.params.id, setUrl])

  return (
    <NavLink
      className={classNames({
        table__link: true,
        table__link_m: sex === 'm',
        table__link_f: sex === 'f'
      })}
      to={{
       pathname: `/people/${slug}/`,
       search: location.search
      }}
      exact
      >
        {name}
    </NavLink>
  )
}