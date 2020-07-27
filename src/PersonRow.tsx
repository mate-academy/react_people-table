import React from 'react';
import { NavLink } from 'react-router-dom';
import { Person } from './interfaces';

interface Props {
  person: Person;
  index: number;
  active: string;
  sex: string;
  findParent: (name: string) => Person | undefined;
}

export const PersonRow: React.FC<Props> = ({ person, index, active, sex, findParent }) => {
  return (
    <tr key={person.name} className={`${active} ${sex}`}>
      <th scope="row">{index + 1}</th>
      <td>
        <NavLink to={`${person.slug}`}>
          {person.name}
        </NavLink>
      </td>
      <td>{person.sex}</td>
      <td>{person.born}</td>
      <td>{person.died}</td>
      <td>
        {
          findParent(person.motherName)
            ? (
              <NavLink className="bold" to={`${findParent(person.motherName)?.slug}`}>
                {person.motherName}
              </NavLink>
            )
            : <>{person.motherName}</>
        }
      </td>
      <td>
        {
          findParent(person.fatherName)
            ? (
              <NavLink className="bold" to={`${findParent(person.fatherName)?.slug}`}>
                {person.fatherName}
              </NavLink>
            )
            : <>{person.fatherName}</>
        }
      </td>
    </tr>
  );
};
