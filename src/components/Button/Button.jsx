export const Button = ({
  children = '',
  className = '',
  type = 'button',
  onClick,
  ...props
}) => (
  <button
    // eslint-disable-next-line react/button-has-type
    type={type}
    className={`button ${className}`}
    onClick={onClick}
    {...props}
  >
    {children}
  </button>
);
