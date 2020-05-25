import React, { } from 'react';
import { useRouteMatch, useHistory } from 'react-router-dom';
import classNames from 'classnames';
import { People } from './interface';

type Props = {
  people: People[];
};

const PersonRow: React.FC<Props> = ({ people }) => {
  const match: any = useRouteMatch();
  const history = useHistory();

  const handlChangeUrl = (slug: any) => {
    history.push(`/people/${slug}`);
  };

  // const onKeyPressHandler = () => {

  // };

  return (
    <>
      {people.map((item) => (
        <tr className={classNames({ personActive: item.slug === match.params.id })}>
          <th
            key={item.slug}
            onClick={() => handlChangeUrl(item.slug)}
            className={classNames({ women: item.sex === 'f' }, { men: item.sex === 'm' })}
          >
            {item.name}
          </th>
          <td>{item.sex}</td>
          <td>{item.born}</td>
          <td>{item.died}</td>
          <td
            className="women"
          >
            {item.motherName}
          </td>
          <th
            className="men"
          >
            {item.fatherName}
          </th>
        </tr>
      ))}
    </>
  );
};

export default PersonRow;
