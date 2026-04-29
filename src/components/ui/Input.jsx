const Input = ({ className = "", ...props }) => {
  return <input className={["ui-input", className].filter(Boolean).join(" ")} {...props} />;
};

export default Input;
