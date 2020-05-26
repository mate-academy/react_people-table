import React, { } from 'react';
import classNames from 'classnames';
import { People } from './interface';

type Props = {
  item: People;
  handlChangeUrl: Function;
};

const PersonName: React.FC<Props> = ({ item, handlChangeUrl }) => {
  return (
    <th
      key={item.slug}
      onClick={() => handlChangeUrl(item.slug)}
      className={classNames({ women: item.sex === 'f' }, { men: item.sex === 'm' })}
    >
      {item.name}
    </th>
  );
};

export default PersonName;
