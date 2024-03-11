import classNames from 'classnames';

export function Button({
  children,
  type = 'button',
  className,
  ...restProps
}) {
  return (
    <button
      // eslint-disable-next-line react/button-has-type
      type={type}
      className={classNames('button', className)}
      {...restProps}
    >
      {children}
    </button>
  );
}
