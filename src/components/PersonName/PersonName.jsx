import React, { useEffect } from 'react';
import { NavLink, useHistory} from 'react-router-dom';
import './PersonName.scss';
import classNames from 'classnames';

export const PersonName = ({ name, match, slug, sex, location, setUrl }) => {
  useEffect(() => {
   setUrl(match.params.id)
  }, [match.params.id])

  return (
    <NavLink
      className={classNames({
        link_m: sex === 'm',
        link_f: sex === 'f'
      })}
      to={`/people/${slug}`}
      >
        {name}
    </NavLink>
  )
}