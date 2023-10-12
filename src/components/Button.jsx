
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
      type={type}
      onClick={onClick}
      className={className}
    >
      {children}
    </button>
  )
}
