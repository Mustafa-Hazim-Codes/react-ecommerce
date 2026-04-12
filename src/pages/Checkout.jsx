// src/pages/Checkout.jsx
import { useState } from "react";
import { useCart } from "../context/CartContext";

const Checkout = () => {
  const { cartItems, clearCart } = useCart();

  const [form, setForm] = useState({
    name: "",
    address: "",
    payment: "card",
  });

  const total = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.name || !form.address) {
      alert("Please fill all fields");
      return;
    }

    alert("Order placed successfully!");
    clearCart();
  };

  return (
    <div className="checkout-page">
      <h2 className="checkout-title">Checkout</h2>

      <div className="checkout-wrapper">
        {/* LEFT: FORM */}
        <form onSubmit={handleSubmit} className="checkout-form">
          <h3>Shipping Details</h3>

          <input
            type="text"
            placeholder="Full Name"
            value={form.name}
            onChange={(e) =>
              setForm({ ...form, name: e.target.value })
            }
          />

          <input
            type="text"
            placeholder="Address"
            value={form.address}
            onChange={(e) =>
              setForm({ ...form, address: e.target.value })
            }
          />

          <select
            value={form.payment}
            onChange={(e) =>
              setForm({ ...form, payment: e.target.value })
            }
          >
            <option value="card">💳 Card</option>
            <option value="cash">💵 Cash on Delivery</option>
          </select>

          <button className="checkout-btn" type="submit">
            Place Order
          </button>
        </form>

        {/* RIGHT: SUMMARY */}
        <div className="checkout-summary">
          <h3>Order Summary</h3>

          {cartItems.length === 0 ? (
            <p className="empty">Your cart is empty</p>
          ) : (
            cartItems.map((item) => (
              <div key={item.id} className="summary-item">
                <span>{item.title}</span> &nbsp;
                <span>
                  {item.quantity} × ${item.price}
                </span>
              </div>
            ))
          )}

          <div className="summary-total">
            <span>Total</span>
            <strong>${total.toFixed(2)}</strong>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;