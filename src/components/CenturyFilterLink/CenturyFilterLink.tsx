import React from 'react';
import cn from 'classnames';
import { Link, useLocation } from 'react-router-dom';

type Props = {
  century: string,
  handelCentury: (querytype: string, value: string) => void;
};

export const CenturyFilterLink: React.FC<Props> = (props) => {
  const { century, handelCentury } = props;
  const { search } = useLocation();
  const isActive = search.includes(`century=${century}`);

  return (
    <Link
      data-cy="century"
      className={cn(
        'button mr-1',
        { 'is-info': isActive },
      )}
      to={
        isActive
          ? '/people'
          : `/people?century=${century}`
      }
      onClick={(event) => {
        event.preventDefault();
        handelCentury('century', century);
      }}
    >
      {century}
    </Link>
  );
};
