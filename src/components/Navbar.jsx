import { Link } from "react-router-dom";
import "../styles/navbar.css";
const Navbar = () => {
  return (
    <nav className="navbar">
      <h2 className="logo">Shop</h2>

      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/cart">Cart</Link>
      </div>
    </nav>
  );
};

export default Navbar;