import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

const Cart = () => {
  const { cartItems, updateQuantity, removeFromCart, getTotalPrice } = useCart();

  if (cartItems.length === 0) {
    return (
      <div className="empty-cart">
        <h2>Your cart is empty 🛒</h2>
        <p>Looks like you haven’t added anything yet.</p>

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
          <h3>{item.title}</h3>
          <p>${item.price}</p>

          <div className="quantity-controls">
            <button onClick={() => updateQuantity(item.id, -1)}>−</button>
            <span>{item.quantity}</span>
            <button onClick={() => updateQuantity(item.id, 1)}>+</button>
          </div>

          <button className="remove-btn" onClick={() => removeFromCart(item.id)}>Remove</button>
        </div>
      ))}

      {/* 💰 Total */}
      <h2>Total: ${getTotalPrice().toFixed(2)}</h2>
    </div>
  );
};

export default Cart;