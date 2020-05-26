import React from 'react';
import classNames from 'classnames';
import { useParams, Link, useLocation } from 'react-router-dom';

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

  const location = useLocation();
  const { personSlug } = useParams();
  const searchParams = new URLSearchParams(location.search);

  return (
    <tr
      key={name}
      className={classNames('has-text-white', {
        'has-background-info': sex === 'm' && personSlug !== slug,
        'has-background-danger': sex === 'f' && personSlug !== slug,
        'has-background-warning': personSlug === slug,
      })}
    >
      <td>
        <Link to={{
          pathname: `/people/${slug}`,
          search: searchParams.toString(),
        }}
        >
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
          <Link to={{
            pathname: `/people/${father.slug}`,
            search: searchParams.toString(),
          }}
          >
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
            to={{
              pathname: `/people/${mother.slug}`,
              search: searchParams.toString(),
            }}
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
