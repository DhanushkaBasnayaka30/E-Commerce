import { configureStore } from "@reduxjs/toolkit";
import LoginReducer from "../Slices/UserSlice.js";
import cartReducer from "../Slices/CartSlice.js";

// Helper function to save cart state to localStorage
const saveCartStateToLocalStorage = (cartState) => {
  try {
    const serializedState = JSON.stringify(cartState);
    localStorage.setItem("cart", serializedState);
  } catch (error) {
    console.error("Could not save cart state to localStorage:", error);
  }
};

// Create the Redux store
export const store = configureStore({
  reducer: {
    loginslice: LoginReducer,
    cart: cartReducer,
  },
});

// Subscribe to the store to persist cart state changes to localStorage
store.subscribe(() => {
  const state = store.getState();
  saveCartStateToLocalStorage(state.cart);
});

export default store;
