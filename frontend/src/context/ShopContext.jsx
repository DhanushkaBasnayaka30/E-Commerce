import React, { createContext, useState, useMemo, useEffect } from "react";
import { products } from "../assets/assets";
import { toast } from "react-toastify";

// Create the context
export const ShopContext = createContext();

// Context Provider component
const ShopContextProvider = (props) => {
	const currency = "$";
	const delivery_fee = 10;
	const [search, setSearch] = useState("");
	const [showSearch, setShowSearch] = useState(false);
	const [visible, setVisible] = useState(false);
	const [cartItem, setCartItems] = useState({});
	const [itemCount, setItemCount] = useState(0); // Fixed typo here

	// Function to load cart data from localStorage
	const loadCartData = () => {
		const savedCartItem = localStorage.getItem("cartItem");
		const savedItemCount = localStorage.getItem("itemCount");

		if (savedCartItem) {
			setCartItems(JSON.parse(savedCartItem));
		}
		if (savedItemCount) {
			setItemCount(Number(savedItemCount));
		}
	};

	// Load cart data on component mount
	useEffect(() => {
		loadCartData();
	}, []);

	// Add to cart function
	const addToCart = async (itemId, size) => {
		console.log("Item ID:", itemId);
		console.log("Selected Size:", size);

		// Ensure both itemId and size are provided
		if (itemId && size) {
			// Clone the cartItem object
			let cartItemCopy = structuredClone(cartItem);

			// Check if itemId exists in the cart
			if (cartItemCopy[itemId]) {
				console.log("Item found in cart");

				// Check if the size exists for the item
				if (cartItemCopy[itemId][size]) {
					console.log("Size exists, incrementing quantity");
					cartItemCopy[itemId][size] += 1;
				} else {
					console.log("New size for the item, setting quantity to 1");
					cartItemCopy[itemId][size] = 1;
				}
			} else {
				// If itemId doesn't exist, create it with the selected size
				console.log("New item, adding to cart");
				cartItemCopy[itemId] = { [size]: 1 };
			}

			// Update the cart state
			setCartItems(cartItemCopy);
			console.log("Updated Cart:", cartItemCopy);
		} else {
			toast.error("Select Product size");
			return;
		}
	};

	// Function to calculate total item count in the cart
	const fetchItemCount = async () => {
		let total = 0;
		for (const items in cartItem) {
			for (const item in cartItem[items]) {
				try {
					if (cartItem[items][item] > 0) {
						total += cartItem[items][item];
					}
				} catch (error) {
					console.log(error);
				}
			}
		}
		console.log("Total items in cart:", total);
		return total;
	};

	// Update item count whenever cartItem changes
	useEffect(() => {
		const updateItemCount = async () => {
			const count = await fetchItemCount();
			setItemCount(count);

			// Save updated cartItem and itemCount to localStorage
			localStorage.setItem("cartItem", JSON.stringify(cartItem));
			localStorage.setItem("itemCount", count);
		};
		updateItemCount();
	}, [cartItem]);

	// Memoize the value object to avoid unnecessary re-renders
	const value = useMemo(
		() => ({
			products,
			currency,
			delivery_fee,
			search,
			setSearch,
			showSearch,
			setShowSearch,
			visible,
			setVisible,
			cartItem,
			addToCart,
			fetchItemCount,
			itemCount, // Pass the itemCount to context
		}),
		[products, currency, delivery_fee, search, showSearch, visible, cartItem, itemCount]
	);

	return (
		<ShopContext.Provider value={value}>
			{props.children}
		</ShopContext.Provider>
	);
};

export default ShopContextProvider;
