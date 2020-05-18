import React from 'react';
import cn from 'classnames';

interface Props {
  name: string;
  sex: string;
  born: number;
}

export const PersonName: React.FC<Props> = ({ name, sex, born }) => {
  return (
    <td
      scope="row"
      className={
        cn({
          'Person--name__male': sex === 'm',
          'Person--name__female': sex === 'f',
          'Old-birth': born <= 1650,
        })
      }
    >
      {name}
    </td>
  );
};
