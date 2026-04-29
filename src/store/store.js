import { configureStore } from "@reduxjs/toolkit";
import cartReducer, { CART_STORAGE_KEY } from "./cartSlice";
import wishlistReducer, { WISHLIST_STORAGE_KEY } from "./wishlistSlice";
import { saveToStorage } from "./storage";

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    wishlist: wishlistReducer,
  },
});

store.subscribe(() => {
  const state = store.getState();

  saveToStorage(CART_STORAGE_KEY, state.cart.items);
  saveToStorage(WISHLIST_STORAGE_KEY, state.wishlist.items);
});
