import { createSlice } from '@reduxjs/toolkit';

// Helper functions for localStorage
const loadStateFromLocalStorage = () => {
  try {
    const serializedState = localStorage.getItem('cart');
    return serializedState ? JSON.parse(serializedState) : undefined;
  } catch (error) {
    console.error('Could not load state from localStorage:', error);
    return undefined;
  }
};

// Initial state for the cart
const initialState = loadStateFromLocalStorage() || {
  mobileno: '',
  items: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    setMobileNo: (state, action) => {
      state.mobileno = action.payload;
    },
    addItem: (state, action) => {
      const { itemId, size, quantity } = action.payload;

      const existingItem = state.items.find((item) => item.itemId === itemId);

      if (existingItem) {
        const existingSize = existingItem.sizes.find((s) => s.size === size);

        if (existingSize) {
          existingSize.quantity += quantity;
        } else {
          existingItem.sizes.push({ size, quantity });
        }
      } else {
        state.items.push({
          itemId,
          sizes: [{ size, quantity }],
        });
      }
    },
    removeItem: (state, action) => {
      const { itemId, size } = action.payload;

      const itemIndex = state.items.findIndex((item) => item.itemId === itemId);
      if (itemIndex !== -1) {
        const sizeIndex = state.items[itemIndex].sizes.findIndex(
          (s) => s.size === size
        );

        if (sizeIndex !== -1) {
          state.items[itemIndex].sizes.splice(sizeIndex, 1);
        }

        if (state.items[itemIndex].sizes.length === 0) {
          state.items.splice(itemIndex, 1);
        }
      }
    },
    increaseQuantity: (state, action) => {
      const { itemId, size } = action.payload;

      const existingItem = state.items.find((item) => item.itemId === itemId);
      if (existingItem) {
        const existingSize = existingItem.sizes.find((s) => s.size === size);
        if (existingSize) {
          existingSize.quantity += 1;
        }
      }
    },
    decreaseQuantity: (state, action) => {
      const { itemId, size } = action.payload;

      const existingItem = state.items.find((item) => item.itemId === itemId);
      if (existingItem) {
        const existingSize = existingItem.sizes.find((s) => s.size === size);
        if (existingSize && existingSize.quantity > 1) {
          existingSize.quantity -= 1;
        } else {
          // Remove the size from the item if quantity becomes 0
          existingItem.sizes = existingItem.sizes.filter((s) => s.size !== size);

          // If no sizes left, remove the item completely
          if (existingItem.sizes.length === 0) {
            state.items = state.items.filter((item) => item.itemId !== itemId);
          }
        }
      }
    },
    clearCart: (state) => {
      state.mobileno = '';
      state.items = [];
    },
  },
});

// Export the actions
export const { setMobileNo, addItem, removeItem, increaseQuantity, decreaseQuantity, clearCart } = cartSlice.actions;
export const selectItems = (state) => state.cart.items;

// Export the reducer
export default cartSlice.reducer;
