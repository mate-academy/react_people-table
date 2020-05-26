import React from 'react';
import { useParams, useLocation, useHistory } from 'react-router-dom';
import cn from 'classnames';

type Props = {
  people: Person[];
};

export const PersonRow: React.FC<Props> = ({ people }) => {
  const { personSlug } = useParams();
  const location = useLocation();
  const history = useHistory();

  return (
    <>
      {people.map((person: Person) => (
        <tr
          className={cn('person', {
            'table-active': person.slug === personSlug,
          })}
          key={person.id}
        >
          <th scope="row">{person.id}</th>
          <td>
            <button
              type="button"
              onClick={() => {
                history.push({
                  pathname: `/people/${person.slug}`,
                  search: location.search,
                });
              }}
            >
              {person.name}
            </button>
          </td>
          <td className={cn({
            person__male: person.sex === 'm',
            person__female: person.sex === 'f',
          })}
          >
            {person.sex}
          </td>
          <td>{person.born}</td>
          <td>{person.died}</td>
          <td>
            {person.mother
              ? (
                <button
                  type="button"
                  className="person__female"
                  onClick={() => {
                    history.push({
                      pathname: `/people/${person.mother?.slug}`,
                      search: location.search,
                    });
                  }}
                >
                  {person.motherName}
                </button>
              ) : (
                <span>
                  {person.motherName}
                </span>
              )}
          </td>
          <td>
            {person.mother
              ? (
                <button
                  type="button"
                  className="person__male"
                  onClick={() => {
                    history.push({
                      pathname: `/people/${person.father?.slug}`,
                      search: location.search,
                    });
                  }}
                >
                  {person.fatherName}
                </button>
              ) : (
                <span>
                  {person.fatherName}
                </span>
              )}
          </td>
        </tr>
      ))}
    </>
  );
};
