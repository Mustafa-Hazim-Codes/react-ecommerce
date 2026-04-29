import { useState } from "react";
import { useCart } from "../context/CartContext";
import { Button, Card, Input, Select } from "../components/ui";

const Checkout = () => {
  const { cartItems, clearCart, getSubtotal, getShipping, getTax, getTotalPrice } =
    useCart();

  const [form, setForm] = useState({
    name: "",
    address: "",
    payment: "card",
  });

  const subtotal = getSubtotal();
  const shipping = getShipping();
  const tax = getTax();
  const total = getTotalPrice();

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
        <Card as="form" onSubmit={handleSubmit} className="checkout-form">
          <h3>Shipping Details</h3>

          <Input
            type="text"
            placeholder="Full Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />

          <Input
            type="text"
            placeholder="Address"
            value={form.address}
            onChange={(e) => setForm({ ...form, address: e.target.value })}
          />

          <Select
            value={form.payment}
            onChange={(e) => setForm({ ...form, payment: e.target.value })}
          >
            <option value="card">Card</option>
            <option value="cash">Cash on Delivery</option>
          </Select>

          <Button className="checkout-btn" type="submit" fullWidth>
            Place Order
          </Button>
        </Card>

        <Card className="checkout-summary">
          <h3>Order Summary</h3>

          {cartItems.length === 0 ? (
            <p className="empty">Your cart is empty</p>
          ) : (
            cartItems.map((item) => (
              <div key={item.id} className="summary-item">
                <span>{item.title}</span>
                <span>
                  {item.quantity} &times; ${item.price}
                </span>
              </div>
            ))
          )}

          <div className="summary-item">
            <span>Subtotal</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
          <div className="summary-item">
            <span>Shipping</span>
            <span>{shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}</span>
          </div>
          <div className="summary-item">
            <span>Estimated tax</span>
            <span>${tax.toFixed(2)}</span>
          </div>

          <div className="summary-total">
            <span>Total</span>
            <strong>${total.toFixed(2)}</strong>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Checkout;
