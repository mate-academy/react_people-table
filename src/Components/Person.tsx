import React from 'react';
import { useHistory, useParams, useLocation } from 'react-router-dom';
import cn from 'classnames';

type Props = {
  info: PreparedPerson;
};

export const Person: React.FC<Props> = ({
  info,
}) => {
  const history = useHistory();
  const { slug } = useParams();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const motherName = info.motherName?.name;
  const fatherName = info.fatherName?.name;

  return (
    <tr
      onClick={() => {
        history.push({
          pathname: `/people/${info.slug}`,
          search: searchParams.toString(),
        });
      }}
      className={cn('table__person', {
        'table__person-cell--male': info.sex === 'm',
        'table__person-cell--female': info.sex === 'f',
        'tab-person--selected': info.slug === slug,
      })}
    >
      <td className="table__person-cell">{info.name}</td>
      <td className="table__person-cell">{info.sex}</td>
      <td className="table__person-cell">{info.born}</td>
      <td className="table__person-cell">{info.died}</td>
      <td className="table__person-cell">{fatherName || 'not found'}</td>
      <td className="table__person-cell">{motherName || 'not found'}</td>
    </tr>
  );
};
