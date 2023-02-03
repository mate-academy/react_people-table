import React from 'react';

type Props = React.HtmlHTMLAttributes<HTMLButtonElement> & {
  children: React.ReactNode,
};

export const Button: React.FC<Props> = ({ children, className, ...props }) => {
  return (
    <button
      type="button"
      className={`button ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};
