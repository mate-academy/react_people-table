import React from 'react';
import cn from 'classnames';

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
      {person.name}
    </td>
  );
};
