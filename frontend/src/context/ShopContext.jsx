import React, { createContext, useState, useMemo } from "react";
import { products } from "../assets/assets";

// Create the context
export const ShopContext = createContext();

// Context Provider component
const ShopContextProvider = (props) => {
	const currency = "$";
	const delivery_fee = 10;
	const [search, setSearch] = useState("");
	const [showSearch, setShowSearch] = useState(false);

	// Memoize the value object
	const value = useMemo(() => ({
		products,
		currency,
		delivery_fee,
		search,
		setSearch,
		showSearch,
		setShowSearch,
	}), [products, currency, delivery_fee, search, showSearch]);

	return (
		<ShopContext.Provider value={value}>
			{props.children}
		</ShopContext.Provider>
	);
};

export default ShopContextProvider;
