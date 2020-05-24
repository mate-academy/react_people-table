import React from 'react';
import classNames from 'classnames';
import { useHistory, useParams } from 'react-router-dom';

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
  } = person;

  const history = useHistory();
  const { personSlug } = useParams();

  const handleOnClick = () => {
    history.push(`/people/${slug}`);
  };

  return (
    <tr
      style={{ cursor: 'pointer' }}
      key={name}
      onClick={handleOnClick}
      className={classNames('has-text-white', {
        'has-background-info': sex === 'm' && personSlug !== slug,
        'has-background-danger': sex === 'f' && personSlug !== slug,
        'has-background-warning': personSlug === slug,
      })}
    >
      {}
      <td>
        {name}
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
        {fatherName}
      </td>
      <td>
        {motherName}
      </td>
    </tr>
  );
};

export default PersonRow;
