import React from 'react';

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  children: React.ReactNode,
};

export class Button extends React.Component<Props, any> {
  render() {
    const { children, ...props } = this.props;

    return (
      <button
        type="button"
        {...props}
      >
        {children}
      </button>
    );
  }
}
