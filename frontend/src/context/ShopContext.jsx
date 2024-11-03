import  { createContext, useState, useMemo, useEffect } from "react";
import axios from "axios"; // Import axios if not already
import { toast } from "react-toastify";
export const ShopContext = createContext();
// Context Provider component
const ShopContextProvider = (props) => {
	const currency = "$";
	const delivery_fee = 10;
	const [products, setProducts] = useState([]);
	const [search, setSearch] = useState("");
	const [showSearch, setShowSearch] = useState(false);
	const [visible, setVisible] = useState(false);
	const [cartItem, setCartItems] = useState({});
	const [itemCount, setItemCount] = useState(0);

	// Fetch product data from API
	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await axios.get("http://localhost:8090/api/get-items");
				if (response && response.data) {
					setProducts(response.data.result);
				}
			} catch (error) {
				console.error("Error fetching products:", error);
			}
		};
		fetchData();
	}, []);

	// Function to load cart data from localStorage
	const loadCartData = () => {
		const savedCartItem = localStorage.getItem("cartItem");
		const savedItemCount = localStorage.getItem("itemCount");

		if (savedCartItem) setCartItems(JSON.parse(savedCartItem));
		if (savedItemCount) setItemCount(Number(savedItemCount));
	};

	// Load cart data on component mount
	useEffect(() => {
		loadCartData();
	}, []);

	// Add to cart function
	const addToCart = (itemId, size) => {
		if (itemId && size) {
			const cartItemCopy = structuredClone(cartItem);

			if (cartItemCopy[itemId]) {
				cartItemCopy[itemId][size] = (cartItemCopy[itemId][size] || 0) + 1;
			} else {
				cartItemCopy[itemId] = { [size]: 1 };
			}

			setCartItems(cartItemCopy);
			toast.success("Item added to cart", { autoClose: 600 });
		} else {
			toast.error("Select Product size", { autoClose: 400 });
		}
	};

	// Calculate total item count in the cart
	const fetchItemCount = () => {
		return Object.values(cartItem).reduce((count, sizes) => 
			count + Object.values(sizes).reduce((sum, qty) => sum + qty, 0), 0);
	};

	// Update item count whenever cartItem changes
	useEffect(() => {
		const count = fetchItemCount();
		setItemCount(count);

		// Save updated cartItem and itemCount to localStorage
		localStorage.setItem("cartItem", JSON.stringify(cartItem));
		localStorage.setItem("itemCount", count);
	}, [cartItem]);

	// Update quantity of items in the cart
	const updateQuantity = (id, quantity, size) => {
		if (quantity < 0) return;
		const cartData = structuredClone(cartItem);
		cartData[id][size] = quantity;
		setCartItems(cartData);
	};

	// Calculate the total cart amount
	const getCartAmount = () => {
		return Object.keys(cartItem).reduce((total, itemId) => {
			const itemInfo = products.find((product) => product._id === itemId);
			if (!itemInfo) return total;
			return total + Object.entries(cartItem[itemId]).reduce(
				(sum, [size, qty]) => sum + itemInfo.price * qty, 0
			);
		}, 0);
	};

	// Memoize the value object to avoid unnecessary re-renders
	const value = useMemo(() => ({
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
	}), [
		products,
		currency,
		delivery_fee,
		search,
		showSearch,
		visible,
		cartItem,
		itemCount,
	]);

	return (
		<ShopContext.Provider value={value}>
			{props.children}
		</ShopContext.Provider>
	);
};

export default ShopContextProvider;
