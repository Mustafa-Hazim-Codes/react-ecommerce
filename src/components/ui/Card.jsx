const Card = ({
  as: Component = "div",
  className = "",
  interactive = false,
  ...props
}) => {
  const classes = ["ui-card", interactive ? "ui-card--interactive" : "", className]
    .filter(Boolean)
    .join(" ");

  return <Component className={classes} {...props} />;
};

export default Card;
