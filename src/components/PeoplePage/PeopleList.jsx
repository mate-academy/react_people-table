import React from 'react';
import classNames from 'classnames';
import propTypes from 'prop-types';
import { useLocation } from 'react-router-dom';
import { PersonName } from '../PersonName/PersonName';
import './PeopleStyle.scss';

export const PeoplesList = ({ people }) => {
  const location = useLocation();

  const findParent = parentName => (
    people.find(person => person.name === parentName)
  );

  return (
    <>
      {people.map((person) => {
        const { slug, name, sex, born, died, motherName, fatherName } = person;

        return (
          <tr
            key={person.name}
            className={
              classNames(
                { selected: `/peoples/${slug}` === location.pathname },
              )}
          >
            <td className="table__list-item">
              <PersonName
                name={name}
                slug={slug}
                sex={sex}
              />
            </td>
            <td>{sex}</td>
            <td>{born}</td>
            <td>{died}</td>
            <td>
              {findParent(motherName)
                ? (
                  <PersonName
                    name={motherName}
                    slug={findParent(motherName).slug}
                    sex={findParent(motherName).sex}
                  />
                )
                : <>{motherName}</>
              }
            </td>
            <td>
              {findParent(fatherName)
                ? (
                  <PersonName
                    name={fatherName}
                    slug={findParent(fatherName).slug}
                    sex={findParent(fatherName).sex}
                  />
                )
                : <>{fatherName}</>
              }
            </td>
          </tr>
        );
      })}
    </>
  );
};
