const Select = ({ className = "", children, ...props }) => {
  return (
    <select className={["ui-input", className].filter(Boolean).join(" ")} {...props}>
      {children}
    </select>
  );
};

export default Select;
