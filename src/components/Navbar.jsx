import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import "../styles/navbar.css";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="navbar">
      <h2 className="logo"><Link to={'/'}>Shop</Link></h2>

      {/* Hamburger */}
      <div className="hamburger" onClick={() => setIsOpen(!isOpen)}>
        ☰
      </div>

      {/* Links */}
      <div className={`nav-links ${isOpen ? "open" : ""}`}>
        <NavLink to="/" onClick={() => setIsOpen(false)}>
          Home
        </NavLink>
        <NavLink to="/cart" onClick={() => setIsOpen(false)}>
          Cart
        </NavLink>
      </div>
    </nav>
  );
};

export default Navbar;