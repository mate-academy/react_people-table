import React from 'react';
import { useHistory } from 'react-router-dom';

type Props = {
  people: Person[];
};

export const PersonRow: React.FC<Props> = ({ people }) => {
  const history = useHistory();

  return (
    <>
      {people.map(person => (
        <tr
          key={person.name}
          onClick={() => {
            history.push({
              pathname: `/people/${person.slug}`,
            });
          }}
        >
          <td>{person.name}</td>
          <td>{person.sex}</td>
          <td>{person.born}</td>
          <td>{person.died}</td>
          <td>{person.motherName}</td>
          <td>{person.fatherName}</td>
        </tr>

      ))}
    </>
  );
};
