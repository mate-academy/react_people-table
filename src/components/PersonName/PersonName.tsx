import classNames from 'classnames';
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Person } from '../../types/Person';

type Props = {
  person: Person | undefined
};

export const PersonName: React.FC<Props> = ({ person }) => {
  const isPerson = person !== undefined;
  const { search } = useLocation();

  return (
    <>
      {isPerson && (
        <Link
          className={classNames({
            'has-text-danger': person.sex === 'f',
          })}
          to={`/people/${person.slug}${search}`}
        >
          {person.name}
        </Link>
      )}
    </>
  );
};
