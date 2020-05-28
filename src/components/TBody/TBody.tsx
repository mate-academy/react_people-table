import React from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import ClassNames from 'classnames';
import './TBody.scss';

type Props = {
  person: PersonWithParents;
};

const TBody: React.FC<Props> = ({ person }) => {
  const history = useHistory();
  const location = useLocation();

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
        <button
          type="button"
          className="body__button"
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
