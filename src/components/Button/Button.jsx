export const Button = ({
  children = '',
  className = '',
  type = 'button',
  ...props
}) => (
  <button
    // eslint-disable-next-line react/button-has-type
    type={type}
    className={`button ${className}`}
    {...props}
  >
    {children}
  </button>
);
