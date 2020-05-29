import React from 'react';
import classnames from 'classnames';
import {
  Link,
  useParams,
} from 'react-router-dom';


type PropsPersonRow = {
  person: Person;
};

export const PersonRow: React.FC<PropsPersonRow> = ({ person }) => {
  const {
    id,
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
  const classes = { table__body: true, male: sex === 'm', female: sex === 'f' };

  return (
    <tr
      className={classnames({ active: personSlug === slug })}
      key={name}
    >
      <td className="table__body">
        {id}
      </td>
      <td className={classnames(classes)}>
        <Link to={`/people/${slug}`}>
          {name}
        </Link>
      </td>
      <td className={classnames(classes)}>
        {person.sex}
      </td>
      <td className={classnames(classes)}>
        {born}
      </td>
      <td className={classnames(classes)}>-</td>
      <td className={classnames(classes)}>
        {died}
      </td>
      <td className="table__body female">
        {typeof mother === 'object' ? (
          <Link to={`/people/${mother.slug}`}>
            {motherName}
          </Link>
        ) : (
          <span>{ motherName || ' - - - ' }</span>
        )}
      </td>
      <td className="table__body male">

        {typeof father === 'object' ? (
          <Link to={`/people/${father.slug}`}>
            {fatherName}
          </Link>
        ) : (
          <span>{ fatherName || ' - - - ' }</span>
        )}
      </td>
    </tr>
  );
};
