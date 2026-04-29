const Button = ({
  as: Component = "button",
  variant = "primary",
  size = "md",
  fullWidth = false,
  className = "",
  type,
  ...props
}) => {
  const classes = [
    "ui-button",
    `ui-button--${variant}`,
    `ui-button--${size}`,
    fullWidth ? "ui-button--full" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <Component
      className={classes}
      type={Component === "button" ? type || "button" : type}
      {...props}
    />
  );
};

export default Button;
