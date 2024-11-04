import  { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import { ImBin } from "react-icons/im";
import { IoMdAdd, IoMdRemove } from "react-icons/io";
import axios from "axios";
import { productImages } from "../assets/assets";
import { Loader, Image, Segment } from "semantic-ui-react";

function CartItem() {
	const { currency, updateQuantity } = useContext(ShopContext);
	const [cartItems, setCartItems] = useState([]);
	const [products, setProducts] = useState([]);
	const [isLoading, setLoading] = useState(false); // Initialize as true
	const mobileno = "0726837104";

	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

	useEffect(() => {
		const fetchProducts = async () => {
			try {
				const response = await axios.get("http://localhost:8090/api/get-items");
				if (response && response.data) {
					setProducts(response.data.result);
				}
			} catch (error) {
				console.error("Error fetching products:", error);
			}
		};
		fetchProducts();
	}, []);

	useEffect(() => {
		const fetchCartData = async () => {
			// Start loading
			try {
				const response = await axios.post(
					`http://localhost:8090/api/cart/get/${mobileno}`
				);
				if (response && response.data.result) {
					setCartItems(response.data.result.items);
					setTimeout(() => {
						setLoading(true);
					}, 500);
				} else {
					setCartItems([]); // Handle case where result is empty or undefined
				}
			} catch (error) {
				console.error("Error fetching cart data:", error);
				setCartItems([]); // Reset on error
			} finally {
				// End loading
			}
		};

		if (products.length > 0) {
			fetchCartData();
		}
	}, [mobileno, products]);

	

	return (
		<div className="w-full h-auto sm:px-4 pb-4">
			{cartItems.map((item) => {
				const productItem = products.find(
					(productItem) => productItem._id === item.itemId
				);
				if (!productItem) return null; // Skip if no product found

				return item.sizes.map((product, index) =>
					isLoading ? (
						<div
							key={item._id} // Use a unique identifier for the key
							className="w-full h-auto group flex mb-4 border border-gray-100 hover:bg-gray-200 sm:scale-100 text-sm sm:text-base shadow-md shadow-gray-420">
							<div className="sm:w-3/4 w-5/6 flex">
								{/* Product Image */}
								<div className="w-1/7 h-36 bg-gray-600">
									<img
										src={productImages[productItem.image[0]]} // Access image via item
										alt={productItem.name} // Use item's name for alt text
										className="h-full w-full object-cover"
									/>
								</div>

								{/* Product Details */}
								<div className="w-5/7 h-full sm:p-4 flex flex-col items-start gap-y-2 ml-4">
									<p className="font-bold w-full text-left">
										{productItem.name} {/* Use item's name */}
									</p>
									<div className="text-sm text-gray-700 flex items-center justify-start gap-x-6">
										<p className="text-base font-semibold">
											{currency}
											{product.price} {/* Use item's price */}
										</p>
										<p className="px-2 py-2 bg-gray-200 border">
											{product.size}
										</p>
										{/* Use item's size */}
									</div>
									<div className="w-full h-auto flex gap-x-3 mt-2">
										<button
											className="px-1 py-1 border border-black rounded-sm"
											onClick={() =>
												updateQuantity(item._id, item.quantity - 1, item.size)
											}>
											<IoMdRemove className="text-xs" />
										</button>
										<p>{product.quantity}</p>
										<button
											className="px-1 py-1 border border-black rounded-sm"
											onClick={() =>
												updateQuantity(item._id, item.quantity + 1, item.size)
											}>
											<IoMdAdd className="text-xs" />
										</button>
									</div>
								</div>
							</div>

							{/* Bin Icon for Remove */}
							<div className="sm:w-1/4 w-1/6 flex items-center justify-center">
								<ImBin
									className="w-5 h-5 text-black cursor-pointer hover:scale-110"
									onClick={() => updateQuantity(item._id, 0, item.size)}
								/>
							</div>
						</div>
					) : (
						<div key={index} className="flex flex-col gap-y-2">
							<Segment>
								<Loader active />

								<Image src="https://react.semantic-ui.com/images/wireframe/short-paragraph.png" />
							</Segment>
						</div>
					)
				);
			})}
		</div>
	);
}

export default CartItem;
