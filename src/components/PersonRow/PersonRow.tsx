import React, { FC } from 'react';
import { uuid } from 'uuidv4';
import { NavLink, useRouteMatch } from 'react-router-dom';
// import className from 'classnames';
import { PeopleListInterface } from '../../interfaces';

import './PersonRow.css';

interface PersonRowProps {
  people: PeopleListInterface[];
}

interface MatchParams {
  slug: string;
}

export const PersonRow: FC<PersonRowProps> = ({ people }) => {
  const currentPath = useRouteMatch<MatchParams>().params.slug;
  // const

  return (
    <tbody>
      {people.map((person, index) => (
        <tr
          className={currentPath === person.slug
            ? 'selected'
            : ''}
          key={uuid()}
        >
          <td>{index + 1}</td>
          <td>
            <NavLink to={`/people/${person.slug}`} exact>
              {person.name}
            </NavLink>
          </td>
          <td className={person.sex === 'm' ? 'blue' : 'red'}>
            {person.sex}
          </td>
          <td>{person.born}</td>
          <td>{person.died}</td>
          {person.mother
            ? (
              <td>
                <NavLink to={`/people/${person.mother.slug}`} exact>
                  {person.mother.name}
                </NavLink>
              </td>

            )
            : (
              <td>{person.motherName}</td>
            )}
          {person.father
            ? (
              <td>
                <NavLink to={`/people/${person.father.slug}`} exact>
                  {person.father.name}
                </NavLink>
              </td>

            )
            : (
              <td>{person.fatherName}</td>
            )}
        </tr>
      ))}
    </tbody>
  );
};
