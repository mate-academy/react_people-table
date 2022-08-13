import classNames from 'classnames';
import React from 'react';

type Props = {
  isActive: boolean;
  isReversed: boolean;
  onClick: () => void;
};

export const SortLink: React.FC<Props> = ({
  isActive, isReversed, onClick,
}) => (
  <a href="#sort" onClick={onClick}>
    <span className="icon">
      <i
        className={classNames('fas', {
          'fa-sort': !isActive,
          'fa-sort-up': isActive && !isReversed,
          'fa-sort-down': isActive && isReversed,
        })}
      />
    </span>
  </a>
);
