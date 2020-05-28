import React, { } from 'react';
import { useRouteMatch, useHistory } from 'react-router-dom';
import classNames from 'classnames';
import { People } from './interface';
import PersonName from './PersonName';

type Props = {
  people: People[];
};

const PersonRow: React.FC<Props> = ({ people }) => {
  const match: any = useRouteMatch();
  const history = useHistory();

  const handleChangeUrl = (slug: any) => {
    history.push(`/people/${slug}`);
  };

  return (
    <>
      {people.map((item) => (
        <tr className={classNames({ personActive: item.slug === match.params.id })}>
          <PersonName item={item} handleChangeUrl={handleChangeUrl} />
          <td>{item.sex}</td>
          <td>{item.born}</td>
          <td>{item.died}</td>
          <td
            className="women"
          >
            {item.motherName}
          </td>
          <td
            className="men"
          >
            {item.fatherName}
          </td>
        </tr>
      ))}
    </>
  );
};

export default PersonRow;
