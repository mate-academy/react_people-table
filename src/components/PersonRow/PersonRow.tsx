import React, { FC } from 'react';
import { uuid } from 'uuidv4';
import { NavLink, useParams } from 'react-router-dom';
import className from 'classnames';
import { PeopleListInterface } from '../../interfaces';

import './PersonRow.css';

interface PersonRowProps {
  people: PeopleListInterface[];
}

interface MatchParams {
  slug: string;
}

export const PersonRow: FC<PersonRowProps> = ({ people }) => {
  const currentPath = useParams<MatchParams>().slug;

  return (
    <tbody>
      {people.map((person, index) => {
        const mother = person.mother
          ? (
            <td>
              <NavLink to={`/people/${person.mother.slug}`} exact>
                {person.mother.name}
              </NavLink>
            </td>

          )
          : (
            <td>{person.motherName}</td>
          );
        const father = person.father
          ? (
            <td>
              <NavLink to={`/people/${person.father.slug}`} exact>
                {person.father.name}
              </NavLink>
            </td>

          )
          : (
            <td>{person.fatherName}</td>
          );

        const rowClassName = className({ selected: currentPath === person.slug });
        const sexClassName = className({
          blue: person.sex === 'm',
          red: person.sex === 'f',
        });

        return (
          <tr
            className={rowClassName}
            key={uuid()}
          >
            <td>{index + 1}</td>
            <td>
              <NavLink to={`/people/${person.slug}`} exact>
                {person.name}
              </NavLink>
            </td>
            <td className={sexClassName}>{person.sex}</td>
            <td>{person.born}</td>
            <td>{person.died}</td>
            {mother}
            {father}
          </tr>
        );
      })}
    </tbody>
  );
};
