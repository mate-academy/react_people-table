import React from 'react';
import { useHistory, useParams } from 'react-router-dom';
import classNames from 'classnames';


type PersonRowProps = {
  people: Person[];
};

const PersonRow: React.FC<PersonRowProps> = ({ people }) => {
  const history = useHistory();
  const { personSlug } = useParams();

  const selectPerson = (personUrl: string) => {
    history.push({
      pathname: `/people/${personUrl}`,
    });
  };

  return (
    <>
      {people.map((person: Person) => (
        <tr
          className={classNames({
            person,
            person__active: person.slug === personSlug,
          })}
          key={person.id}
          onClick={() => selectPerson(person.slug)}
        >
          <td>
            {person.id}
          </td>
          <td>
            {person.name}
          </td>
          <td className={classNames({
            person__male: person.sex === 'm',
            person__female: person.sex === 'f',
          })}
          >
            {person.sex}
          </td>
          <td>
            {person.born}
          </td>
          <td>
            {person.died}
          </td>
          <td>
            {person.age}
          </td>
          <td>
            {person.father}
          </td>
          <td>
            {person.mother}
          </td>
          <td>
            {person.century}
          </td>
        </tr>
      ))}
    </>
  );
};

export default PersonRow;
