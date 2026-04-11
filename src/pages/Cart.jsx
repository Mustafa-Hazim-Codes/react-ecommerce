import { useCart } from "../context/CartContext";

const Cart = () => {
  const { cartItems, updateQuantity } = useCart();

  if (cartItems.length === 0) {
    return <h2>Your cart is empty</h2>;
  }

  return (
    <div>
      <h1>Your Cart</h1>

      {cartItems.map((item) => (
        <div key={item.id} className="cart-item">
          <h3>{item.title}</h3>
          <p>${item.price}</p>

          <div className="quantity-controls">
            <button onClick={() => updateQuantity(item.id, -1)}>
              −
            </button>

            <span>{item.quantity}</span>

            <button onClick={() => updateQuantity(item.id, 1)}>
              +
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Cart;