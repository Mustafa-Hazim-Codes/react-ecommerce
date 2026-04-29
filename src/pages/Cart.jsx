import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

const Cart = () => {
  const { cartItems, updateQuantity, removeFromCart, getTotalPrice } = useCart();
  const navigate = useNavigate();

  if (cartItems.length === 0) {
    return (
      <div className="empty-cart">
        <h2>Your cart is empty</h2>
        <p>Looks like you haven't added anything yet.</p>

        <Link to="/" className="shop-btn">
          Go Shopping
        </Link>
      </div>
    );
  }

  return (
    <div>
      <h1>Your Cart</h1>

      {cartItems.map((item) => (
        <div key={item.id} className="cart-item">
          <img
            src={item.image}
            alt={item.title}
            className="cart-image"
            onError={(e) => {
              e.target.src = "https://picsum.photos/100";
            }}
          />

          <div className="cart-info">
            <Link to={`/product/${item.id}`} className="cart-title">
              {item.title}
            </Link>

            <p className="cart-price">${item.price}</p>

            <div className="quantity-controls">
              <button onClick={() => updateQuantity(item.id, -1)}>&minus;</button>
              <span>{item.quantity}</span>
              <button onClick={() => updateQuantity(item.id, 1)}>+</button>
            </div>

            <button className="remove-btn" onClick={() => removeFromCart(item.id)}>
              Remove
            </button>
          </div>
        </div>
      ))}

      <div className="cart-summary">
        <h2>Total: ${getTotalPrice().toFixed(2)}</h2>

        <button className="checkout-btn-cart" onClick={() => navigate("/checkout")}>
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
};

export default Cart;
