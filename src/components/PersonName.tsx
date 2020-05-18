import React from 'react';
import cn from 'classnames';

interface Props {
  name: string;
  sex: string;
}

export const PersonName: React.FC<Props> = ({ name, sex }) => {
  return (
    <td
      scope="row"
      className={
        cn({
          'Person--name__male': sex === 'm',
          'Person--name__female': sex === 'f',
        })
      }
    >
      {name}
    </td>
  );
};
