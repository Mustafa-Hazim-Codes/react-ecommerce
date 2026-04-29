import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { Button, Card } from "../components/ui";

const Cart = () => {
  const {
    cartItems,
    updateQuantity,
    removeFromCart,
    clearCart,
    getSubtotal,
    getShipping,
    getTax,
    getTotalPrice,
    getItemCount,
  } = useCart();
  const navigate = useNavigate();
  const subtotal = getSubtotal();
  const shipping = getShipping();
  const tax = getTax();
  const total = getTotalPrice();

  if (cartItems.length === 0) {
    return (
      <div className="empty-cart">
        <h2>Your cart is empty</h2>
        <p>Looks like you haven't added anything yet.</p>

        <Button as={Link} to="/" className="shop-btn">
          Go Shopping
        </Button>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <div className="cart-header">
        <div>
          <p className="section-kicker">Shopping cart</p>
          <h1>Your Cart</h1>
          <p>{getItemCount()} items ready for checkout</p>
        </div>
        <Button variant="outline" size="sm" onClick={clearCart}>
          Clear Cart
        </Button>
      </div>

      <div className="cart-layout">
        <div className="cart-items">
          {cartItems.map((item) => (
            <Card key={item.id} className="cart-item">
              <Link to={`/product/${item.id}`} className="cart-image-link">
                <img
                  src={item.image}
                  alt={item.title}
                  className="cart-image"
                  onError={(e) => {
                    e.target.src = "https://picsum.photos/160";
                  }}
                />
              </Link>

              <div className="cart-info">
                <div className="cart-item-heading">
                  <div>
                    <span className="cart-category">{item.category}</span>
                    <Link to={`/product/${item.id}`} className="cart-title">
                      {item.title}
                    </Link>
                  </div>

                  <strong className="cart-line-total">
                    ${(item.price * item.quantity).toFixed(2)}
                  </strong>
                </div>

                <p className="cart-description">{item.description}</p>

                <div className="cart-item-meta">
                  <span>${item.price.toFixed(2)} each</span>
                  <span>Qty {item.quantity}</span>
                </div>

                <div className="cart-controls-row">
                  <div className="quantity-controls" aria-label={`Quantity for ${item.title}`}>
                    <Button
                      aria-label={`Decrease quantity for ${item.title}`}
                      onClick={() => updateQuantity(item.id, -1)}
                    >
                      &minus;
                    </Button>
                    <span>{item.quantity}</span>
                    <Button
                      aria-label={`Increase quantity for ${item.title}`}
                      onClick={() => updateQuantity(item.id, 1)}
                    >
                      +
                    </Button>
                  </div>

                  <Button
                    variant="danger"
                    size="sm"
                    className="remove-btn"
                    onClick={() => removeFromCart(item.id)}
                  >
                    Remove
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>

        <Card className="cart-summary">
          <h2>Order Summary</h2>

          <div className="summary-row">
            <span>Subtotal</span>
            <strong>${subtotal.toFixed(2)}</strong>
          </div>
          <div className="summary-row">
            <span>Shipping</span>
            <strong>{shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}</strong>
          </div>
          <div className="summary-row">
            <span>Estimated tax</span>
            <strong>${tax.toFixed(2)}</strong>
          </div>
          <div className="summary-row summary-grand-total">
            <span>Total</span>
            <strong>${total.toFixed(2)}</strong>
          </div>

          <p className="summary-note">
            Free shipping applies automatically when your subtotal reaches $100.
          </p>

          <Button className="checkout-btn-cart" fullWidth onClick={() => navigate("/checkout")}>
            Proceed to Checkout
          </Button>

          <Button as={Link} to="/products" variant="outline" fullWidth>
            Continue Shopping
          </Button>
        </Card>
      </div>
    </div>
  );
};

export default Cart;
