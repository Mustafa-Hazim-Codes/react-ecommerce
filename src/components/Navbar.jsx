import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectCartItemCount } from "../store/cartSlice";
import { selectWishlistCount } from "../store/wishlistSlice";
import "../styles/navbar.css";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const cartCount = useSelector(selectCartItemCount);
  const wishlistCount = useSelector(selectWishlistCount);

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
        <NavLink to="/wishlist" className="cart-nav-link" onClick={() => setIsOpen(false)}>
          Wishlist
          {wishlistCount > 0 && <span>{wishlistCount}</span>}
        </NavLink>
        <NavLink to="/cart" className="cart-nav-link" onClick={() => setIsOpen(false)}>
          Cart
          {cartCount > 0 && <span>{cartCount}</span>}
        </NavLink>
      </div>
    </nav>
  );
};

export default Navbar;
