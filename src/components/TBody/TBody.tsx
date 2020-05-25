import React from 'react';
import { NavLink } from 'react-router-dom';
import ClassNames from 'classnames';
import './TBody.scss';

type Props = {
  person: PersonWithId;
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
            body__name: person.born < 1650,
            body__sex_male: person.sex === 'm',
            body__sex_female: person.sex === 'f',
          },
        )}
      >
        <NavLink
          to={`/people/${person.slug}`}
          className="body__link"
        >
          {person.name}
        </NavLink>
      </td>
      <td className={ClassNames(
        'body__cell',
        {
          body__sex_male: person.sex === 'm',
          body__sex_female: person.sex === 'f',
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
          { body__age: person.died - person.born >= 65 },
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
            body__sex_female: person.motherName,
          },
        )}
      >
        {person.motherName ? person.motherName : '---------'}
      </td>
      <td
        className={ClassNames(
          'body__cell',
          {
            body__sex_male: person.fatherName,
          },
        )}
      >
        {person.fatherName ? person.fatherName : '---------'}
      </td>
    </tr>
  );
};

export default TBody;
