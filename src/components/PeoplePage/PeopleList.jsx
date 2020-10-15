import React from 'react';
import classNames from 'classnames';
import { useLocation } from 'react-router-dom';
import { PersonName } from '../PersonName/PersonName';
import './PeopleStyle.scss';

export const PeoplesList = ({ people }) => {
  const location = useLocation();

  return (
    <>
      {people.map(person => (
        <tr
          key={person.name}
          className={
            classNames(
              { selected: `/peoples/${person.slug}` === location.pathname },
            )}
        >
          <td>
            <PersonName
              name={person.name}
              slug={person.slug}
            />
          </td>
          <td>{person.sex}</td>
          <td>{person.born}</td>
          <td>{person.died}</td>
          {/* <td>{person.mother}</td>
          <td>{person.age}</td> */}
        </tr>
      ))}
    </>
  );
};
