import React from 'react';
import { useHistory, useParams, useLocation } from 'react-router-dom';
import classNames from 'classnames';


type PersonRowProps = {
  people: Person[];
};

const PersonRow: React.FC<PersonRowProps> = ({ people }) => {
  const history = useHistory();
  const { personSlug } = useParams();
  const location = useLocation();

  const selectPerson = (personUrl: string) => {
    history.push({
      pathname: `/people/${personUrl}`,
      search: location.search,
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
          <td className="person__male">
            {person.father}
          </td>
          <td className="person__female">
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
