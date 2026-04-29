import { createSlice } from "@reduxjs/toolkit";
import { loadFromStorage } from "./storage";

export const CART_STORAGE_KEY = "shop-cart";

const initialState = {
  items: loadFromStorage(CART_STORAGE_KEY, []),
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const product = action.payload;
      const existingItem = state.items.find((item) => item.id === product.id);

      if (existingItem) {
        existingItem.quantity += 1;
        return;
      }

      state.items.push({ ...product, quantity: 1 });
    },
    updateQuantity: (state, action) => {
      const { productId, amount } = action.payload;
      const item = state.items.find((cartItem) => cartItem.id === productId);

      if (!item) return;

      item.quantity += amount;

      if (item.quantity <= 0) {
        state.items = state.items.filter((cartItem) => cartItem.id !== productId);
      }
    },
    removeFromCart: (state, action) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
    clearCart: (state) => {
      state.items = [];
    },
  },
});

export const { addToCart, updateQuantity, removeFromCart, clearCart } =
  cartSlice.actions;

export const selectCartItems = (state) => state.cart.items;
export const selectCartItemCount = (state) =>
  state.cart.items.reduce((total, item) => total + item.quantity, 0);
export const selectCartSubtotal = (state) =>
  state.cart.items.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
export const selectCartShipping = (state) => {
  const subtotal = selectCartSubtotal(state);

  return subtotal === 0 || subtotal >= 100 ? 0 : 9.99;
};
export const selectCartTax = (state) => selectCartSubtotal(state) * 0.08;
export const selectCartTotal = (state) =>
  selectCartSubtotal(state) + selectCartShipping(state) + selectCartTax(state);

export default cartSlice.reducer;
