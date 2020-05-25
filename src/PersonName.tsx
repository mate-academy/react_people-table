import React from 'react';
import cn from 'classnames';
import { Link } from 'react-router-dom';

type Props = {
  person: PeopleTable;
};
export const PersonName: React.FC<Props> = ({ person }) => {
  return (
    <td
      className={cn({
        'Person--male': person.sex === 'm',
        'Person--female': person.sex === 'f',
      })}
    >
      <Link to={`/people/${person.slug}`}>
        {person.name}
      </Link>
    </td>
  );
};
