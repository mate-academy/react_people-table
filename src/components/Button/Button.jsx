import classNames from 'classnames';

export function Button({
  type = 'button',
  className = '',
  children,
  ...props
}) {
  // eslint-disable-next-line no-console
  console.log('🚀 ~ children:', children);

  return (
    <button
      // eslint-disable-next-line react/button-has-type
      type={type}
      className={classNames('button', className)}
      {...props}
    >
      {children}
    </button>
  );
}
