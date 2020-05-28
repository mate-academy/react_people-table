import React from 'react';
import { useHistory } from 'react-router-dom';

type Props = {
  index: number;
  name: string;
  sex: string;
  born: number;
  died: number;
  father: string;
  mother: string;
  slug: string;
};

export const PersonRow: React.FC<Props> = React.memo(
  ({
    index, name, sex, born, died, mother, father, slug,
  }) => {
    const history = useHistory();

    const century = Math.ceil(died / 100);
    const rowStyle = sex === 'f' ? 'red' : 'blue';

    const addSlug = (personSlug: string) => {
      history.push({
        pathname: `/people/${personSlug}`,
      });
    };

    return (
      <tr style={{ color: rowStyle }} onClick={() => addSlug(slug)}>
        <td>{index}</td>
        <td>{name}</td>
        <td>{sex}</td>
        <td>{born}</td>
        <td>{died}</td>
        <td>{died - born}</td>
        <td>{century}</td>
        <td>{father}</td>
        <td>{mother}</td>
      </tr>
    );
  },
);
