export const Button = ({
  type = 'button',
  onClick,
  className = 'button',
  children,
  ...props
}) => {
  return (
    <button
      {...props}
      // eslint-disable-next-line react/button-has-type
      type={type}
      onClick={onClick}
      className={className}
    >
      {children}
    </button>
  );
};
