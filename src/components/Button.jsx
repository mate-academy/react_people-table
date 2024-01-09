import classNames from 'classnames';

export function Button({
  children,
  type = 'button',
  className,
  ...otherProps
}) {
  return (
    <button
      // eslint-disable-next-line react/button-has-type
      type={type}
      className={classNames('button', className)}
      {...otherProps}
    >
      {children}
    </button>
  );
}

export const usage = (
  <>
    <Button
      className="is-info"
      onClick={() => {}}
      id="reset-button"
    >
      <span className="icon is-small">
        <i className="fas fa-minus" />
      </span>
    </Button>

    <Button id="reset-button" qwe="123">
      Reset
    </Button>
  </>
);
