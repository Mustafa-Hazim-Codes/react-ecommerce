import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { Button, Card } from "../components/ui";

const Cart = () => {
  const { cartItems, updateQuantity, removeFromCart, getTotalPrice } = useCart();
  const navigate = useNavigate();

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
    <div>
      <h1>Your Cart</h1>

      {cartItems.map((item) => (
        <Card key={item.id} className="cart-item">
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
        </Card>
      ))}

      <div className="cart-summary">
        <h2>Total: ${getTotalPrice().toFixed(2)}</h2>

        <Button className="checkout-btn-cart" onClick={() => navigate("/checkout")}>
          Proceed to Checkout
        </Button>
      </div>
    </div>
  );
};

export default Cart;
