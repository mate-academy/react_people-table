import React from 'react';
import classNames from 'classnames';
import { useParams, Link } from 'react-router-dom';

type Props = {
  person: Person;
};

const PersonRow: React.FC<Props> = ({ person }) => {
  const {
    name,
    sex,
    born,
    died,
    slug,
    fatherName,
    motherName,
    father,
    mother,
  } = person;

  const { personSlug } = useParams();


  return (
    <tr
      style={{ cursor: 'pointer' }}
      key={name}
      className={classNames('has-text-white', {
        'has-background-info': sex === 'm' && personSlug !== slug,
        'has-background-danger': sex === 'f' && personSlug !== slug,
        'has-background-warning': personSlug === slug,
      })}
    >
      {}
      <td>
        <Link to={`/people/${slug}`}>
          {name}
        </Link>
      </td>
      <td>
        {sex}
      </td>
      <td>
        {born}
      </td>
      <td>
        {died}
      </td>
      <td>
        {father ? (
          <Link to={`/people/${father.slug}`}>
            {fatherName}
          </Link>
        ) : (
          <span className="has-text-black">
            {fatherName}
          </span>
        )}
      </td>
      <td>
        {mother ? (
          <Link
            to={`/people/${mother.slug}`}

          >
            {motherName}
          </Link>
        ) : (
          <span className="has-text-black">
            {motherName}
          </span>
        )}
      </td>
    </tr>
  );
};

export default PersonRow;
