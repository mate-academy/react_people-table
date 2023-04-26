import { FC } from 'react';
import classNames from 'classnames';

interface Props {
  onClickCallback: () => void;
  isActive: boolean;
  isReversed: boolean;
}

export const SortLink: FC<Props> = ({
  onClickCallback, isActive, isReversed,
}) => (
  <a href="#sort" onClick={onClickCallback}>
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
