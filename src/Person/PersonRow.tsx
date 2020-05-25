import React from 'react';
import { useHistory, useParams, useLocation } from 'react-router-dom';
import cn from 'classnames';
import './Person.scss';

type Props = {
  people: Person[];
};

export const PersonRow: React.FC<Props> = ({ people }) => {
  const history = useHistory();
  const location = useLocation();
  const { personSlug } = useParams();

  const handleChange = (personUrl?: string) => {
    history.push({
      pathname: `/people/${personUrl}`,
      search: location.search,
    });
  };

  return (
    <>
      {people.map((person: Person) => (
        <tr

          className={cn('person', {
            person__active: person.slug === personSlug,
          })}
          key={person.name}
        >
          <td>{person.id}</td>
          <td
            role="gridcell"
            onClick={() => handleChange(person.slug)}
            className={cn({
              person__male: person.sex === 'm',
              person__female: person.sex === 'f',
            })}
          >
            {person.name}
          </td>
          <td role="gridcell">
            {person.sex}
          </td>
          <td>{person.born}</td>
          <td>{person.died}</td>
          <td
            role="gridcell"
            className={cn('person__female', {
              person__whithoutParent: personSlug === person.motherSlug
              && person.motherSlug === person.motherName,
            })}
            onClick={() => handleChange(person.motherSlug)}
          >
            {personSlug === person.motherSlug
              && person.motherSlug === person.motherName && <span className="error">No info about</span>}
            {person.motherName}
          </td>
          <td
            role="gridcell"
            onClick={() => handleChange(person.fatherSlug)}
            className={cn('person__male', {
              person__whithoutParent: personSlug === person.fatherSlug
            && person.fatherSlug === person.fatherName,
            })}
          >
            {personSlug === person.fatherSlug
              && person.fatherSlug === person.fatherName
              && <span className="error">No info about</span>}

            {person.fatherName}
          </td>

        </tr>
      ))}
    </>
  );
};
