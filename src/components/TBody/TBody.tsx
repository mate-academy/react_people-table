import React from 'react';
import ClassNames from 'classnames';
import { NavLink } from 'react-router-dom';
import './TBody.scss';

type Props = {
  person: PersonWithParents;
};

const TBody: React.FC<Props> = ({ person }) => {
  return (
    <tr className="body">
      <td
        className="body__cell"
      >
        {person.id}
      </td>
      <td
        className={ClassNames(
          'body__cell',
          {
            body__male: person.sex === 'm',
            body__female: person.sex === 'f',
          },
        )}
      >
        <NavLink
          to={`/people/${person.slug}`}
          className="body__link"
          activeClassName="body__link--active"
        >
          {person.name}
        </NavLink>
      </td>
      <td className={ClassNames(
        'body__cell',
        {
          body__male: person.sex === 'm',
          body__female: person.sex === 'f',
        },
      )}
      >
        {person.sex}
      </td>
      <td className="body__cell">
        {person.born}
      </td>
      <td className="body__cell">
        {person.died}
      </td>
      <td
        className={ClassNames(
          'body__cell',
        )}
      >
        {person.died - person.born}
      </td>
      <td className="body__cell">
        {Math.ceil(person.died / 100)}
      </td>
      <td
        className={ClassNames(
          'body__cell',
          {
            body__female: person.motherName,
          },
        )}
      >
        {person.motherName ? person.motherName : '-//-'}
      </td>
      <td
        className={ClassNames(
          'body__cell',
          {
            body__male: person.fatherName,
          },
        )}
      >
        {person.fatherName ? person.fatherName : '-//-'}
      </td>
    </tr>
  );
};

export default TBody;
