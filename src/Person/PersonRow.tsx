import React from 'react';
import { useHistory, useParams } from 'react-router-dom';
import cn from 'classnames';
import './Person.scss';

type Props = {
  people: Person[];
};

export const PersonRow: React.FC<Props> = ({ people }) => {
  const history = useHistory();
  const { personSlug } = useParams();


  const handleChange = (personUrl: string) => {
    history.push({
      pathname: `/people/${personUrl}`,
    });
  };

  return (
    <>
      {people.map((person: Person) => (
        <tr
          className={cn({
            person: true,
            person__active: person.slug === personSlug,
          })}
          key={person.name}
          onClick={() => handleChange(person.slug)}
        >
          <td>{person.id}</td>
          <td
            className={cn({
              person_male: person.sex === 'm',
              person_female: person.sex === 'f',
            })}
          >
            {person.name}
          </td>
          <td>
            {person.sex}
          </td>
          <td>{person.born}</td>
          <td>{person.died}</td>
          <td
            className="person_female"
          >
            {person.motherName}
          </td>
          <td
            className="person_male"
          >
            {person.fatherName}
          </td>
        </tr>
      ))}
    </>
  );
};
