import React from 'react';

type PersonRowProps = {
  name: string;
  sex: string;
  born: number;
  died: number;
  mother: string;
  father: string;
};

export const PersonRow: React.FC<PersonRowProps> = ({name, sex,born,died,mother,father,}) => (
  <tr className="Person" key={name}>
    <td className={sex==='m'
      ? 'man'
      : 'woman'}>{name}</td>
    <td className={sex==='m'
      ? 'man'
      : 'woman'}>
      {sex==='m'
        ? '  MAN'
        : ' WOMAN'}
    </td>
    <td>{born}</td>
    <td>{died}</td>
    <td className='woman'>{mother}</td>
    <td className='man'>{father}</td>

  </tr>

);
