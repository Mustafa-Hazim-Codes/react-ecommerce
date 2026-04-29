import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import "../styles/navbar.css";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="navbar">
      <h2 className="logo">
        <Link to="/">Shop</Link>
      </h2>

      <button
        type="button"
        className="hamburger"
        aria-label="Toggle navigation menu"
        aria-expanded={isOpen}
        onClick={() => setIsOpen(!isOpen)}
      >
        <span />
        <span />
        <span />
      </button>

      <div className={`nav-links ${isOpen ? "open" : ""}`}>
        <NavLink to="/" onClick={() => setIsOpen(false)}>
          Home
        </NavLink>
        <NavLink to="/products" onClick={() => setIsOpen(false)}>
          Products
        </NavLink>
        <NavLink to="/cart" onClick={() => setIsOpen(false)}>
          Cart
        </NavLink>
      </div>
    </nav>
  );
};

export default Navbar;
