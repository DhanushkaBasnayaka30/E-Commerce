import React, { createContext, useState, useMemo, useEffect } from "react";
import { products } from "../assets/assets";
import { toast } from "react-toastify";
import CartItem from "../components/CartItem";

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
	const [itemCount, setItemCount] = useState(0);

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
    if (itemId && size) {
        let cartItemCopy = structuredClone(cartItem);

        if (cartItemCopy[itemId]) {
            if (cartItemCopy[itemId][size]) {
                cartItemCopy[itemId][size] += 1;
            } else {
                cartItemCopy[itemId][size] = 1;
            }
        } else {
            cartItemCopy[itemId] = { [size]: 1 };
        }

        // Assuming you want to log the itemId, not a "name" property
        console.log(`Added item: ${itemId} with size ${size}`);
        
        // Update the cart state
        setCartItems(cartItemCopy);

        // Show a success toast instead of error
        toast.success("Item added to cart", { autoClose: 600 });
    } else {
        // Show error if size isn't selected
        toast.error("Select Product size", { autoClose: 400 });
        return;
    }
};


	// Function to calculate total item count in the cart
	const fetchItemCount = () => {
		let total = 0;
		for (const items in cartItem) {
			for (const size in cartItem[items]) {
				if (cartItem[items][size] > 0) {
					total += cartItem[items][size];
				}
			}
		}
		return total;
	};

	// Update item count whenever cartItem changes
	useEffect(() => {
		const count = fetchItemCount();
		setItemCount(count);

		// Save updated cartItem and itemCount to localStorage
		localStorage.setItem("cartItem", JSON.stringify(cartItem));
		localStorage.setItem("itemCount", count);
	}, [cartItem]);

	// Function to update quantity of items in the cart
	const updateQuantity = (id, quantity, size) => {
		if (quantity < 0) return; // Prevent negative quantity
		let cartData = structuredClone(cartItem);
		cartData[id][size] = quantity;
		setCartItems(cartData);
	};

	// Function to calculate the total cart amount
	const getCartAmount = () => {
		let totalAmount = 0;
		for (const items in cartItem) {
			const itemInfo = products.find((product) => product._id === items);
			if (!itemInfo) continue; // Skip if product is not found
			for (const size in cartItem[items]) {
				const quantity = cartItem[items][size];
				if (quantity > 0) {
					totalAmount += itemInfo.price * quantity;
				}
			}
		}
		return totalAmount;
	};

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
			itemCount,
			setItemCount,
			setCartItems,
			updateQuantity,
			getCartAmount,
		}),
		[
			products,
			currency,
			delivery_fee,
			search,
			showSearch,
			visible,
			cartItem,
			itemCount,
			updateQuantity,
			getCartAmount,
		]
	);

	return (
		<ShopContext.Provider value={value}>{props.children}</ShopContext.Provider>
	);
};

export default ShopContextProvider;
