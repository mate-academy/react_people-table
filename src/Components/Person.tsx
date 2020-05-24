import React from 'react';
import { useHistory, useParams } from 'react-router-dom';
import cn from 'classnames';
import { v4 as uuidv4 } from 'uuid';

type Props = {
  info: Person;
  id: number;
  bornedBefore1650: boolean;
  isOlder65: boolean;
};

export const Person: React.FC<Props> = ({
  info,
  id,
  bornedBefore1650,
  isOlder65,
}) => {
  const history = useHistory();

  const values = Object.values(info);
  const keys = Object.keys(info);

  const indexOfName = keys.indexOf('name');
  const indexOfAge = keys.indexOf('age');
  const { name } = useParams();

  return (
    <tr
      onClick={() => {
        history.push({
          pathname: `/people/${info.name}`,
        });
      }}
      className={cn(`table__person--lived-in-${info.century}`, {
        'tab-person--selected': info.name === name,
      })}
    >
      <td className="table__person-cell">{id}</td>
      {values.map((value, index) => (
        <td
          key={uuidv4()}
          className={cn({
            underlined: bornedBefore1650 && index === indexOfName,
            'more-than-65': isOlder65 && index === indexOfAge,
            'table__person-cell': true,
            'table__person-cell--male': info.sex === 'm',
            'table__person-cell--female': info.sex === 'f',
          })}
        >
          {value}
        </td>
      ))}
    </tr>
  );
};
