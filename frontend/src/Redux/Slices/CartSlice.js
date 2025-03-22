import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const APP_URL = import.meta.env.VITE_APP_URL;

// Helper functions for localStorage
const loadStateFromLocalStorage = () => {
	try {
		const serializedState = localStorage.getItem("cart");
		return serializedState ? JSON.parse(serializedState) : undefined;
	} catch (error) {
		console.error("Could not load state from localStorage:", error);
		return undefined;
	}
};

const saveStateToLocalStorage = (state) => {
	try {
		localStorage.setItem("cart", JSON.stringify(state));
	} catch (error) {
		console.error("Could not save state to localStorage:", error);
	}
};

// Initial state for the cart
const initialState = loadStateFromLocalStorage() || {
	mobileno: "",
	count: 0,
	items: [],
};

const cartSlice = createSlice({
	name: "cart",
	initialState,
	reducers: {
		setMobileNo: (state, action) => {
			state.mobileno = action.payload;
			saveStateToLocalStorage(state);
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
			state.count = state.items.reduce(
				(acc, item) => acc + item.sizes.reduce((sum, s) => sum + s.quantity, 0),
				0
			);
			saveStateToLocalStorage(state);
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

			state.count = state.items.reduce(
				(acc, item) => acc + item.sizes.reduce((sum, s) => sum + s.quantity, 0),
				0
			);
			saveStateToLocalStorage(state);
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

			state.count = state.items.reduce(
				(acc, item) => acc + item.sizes.reduce((sum, s) => sum + s.quantity, 0),
				0
			);
			saveStateToLocalStorage(state);
		},
		decreaseQuantity: (state, action) => {
			const { itemId, size } = action.payload;
			const existingItem = state.items.find((item) => item.itemId === itemId);

			if (existingItem) {
				const existingSize = existingItem.sizes.find((s) => s.size === size);
				if (existingSize && existingSize.quantity > 1) {
					existingSize.quantity -= 1;
				} else {
					existingItem.sizes = existingItem.sizes.filter(
						(s) => s.size !== size
					);

					if (existingItem.sizes.length === 0) {
						state.items = state.items.filter((item) => item.itemId !== itemId);
					}
				}
			}

			state.count = state.items.reduce(
				(acc, item) => acc + item.sizes.reduce((sum, s) => sum + s.quantity, 0),
				0
			);
			saveStateToLocalStorage(state);
		},
		clearCart: (state) => {
			state.mobileno = "";
			state.items = [];
			state.count = 0;
			saveStateToLocalStorage(state);
		},
		updateCount: (state, action) => {
			state.count = action.payload;
			saveStateToLocalStorage(state);
		},
	},
	setCartFromDataset: (state, action) => {
		console.log("setting data in react redux");
		const newItems = action.payload;

		newItems.forEach((newItem) => {
			const existingItem = state.items.find(
				(item) => item.itemId === newItem.itemId
			);

			if (existingItem) {
				newItem.sizes.forEach((newSize) => {
					const existingSize = existingItem.sizes.find(
						(s) => s.size === newSize.size
					);
					if (existingSize) {
						existingSize.quantity += newSize.quantity;
					} else {
						existingItem.sizes.push(newSize);
					}
				});
			} else {
				state.items.push(newItem);
			}
		});

		state.count = state.items.reduce(
			(acc, item) => acc + item.sizes.reduce((sum, s) => sum + s.quantity, 0),
			0
		);

		saveStateToLocalStorage(state);
	},
});

// Export the actions
export const {
	setMobileNo,
	addItem,
	removeItem,
	increaseQuantity,
	decreaseQuantity,
	clearCart,
	updateCount,
	setCartFromDataset,
} = cartSlice.actions;

export const selectItems = (state) => state.cart.items;
export const selectCount = (state) => state.cart.count;

// Export the reducer
export default cartSlice.reducer;
