import React from 'react';
import classnames from 'classnames';

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  children: React.ReactNode;
};

export const Button: React.FC<Props> = ({ children, className, ...props }) => (
  <button
    type="button"
    className={classnames('button', className)}
    {...props}
  >
    {children}
  </button>
);
