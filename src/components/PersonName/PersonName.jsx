import React from 'react';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import './PersonName.scss';

export const PersonName = ({ name, slug, sex }) => {

  return (
    <Link
      className={classNames('table__list-link',
        { 'table__name-male': sex === 'm' },
        { 'table__name-female': sex === 'f' })
      }
      to={{ pathname: `/peoples/${slug}` }}
    >
      { name}
    </Link>
  );
};
