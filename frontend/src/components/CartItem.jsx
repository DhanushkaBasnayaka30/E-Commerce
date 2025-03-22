import { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import { ImBin } from "react-icons/im";
import { IoMdAdd, IoMdRemove } from "react-icons/io";
import axios from "axios";
import { productImages } from "../assets/assets";
import Loader from "../assets/square-loader.json";
import { Player } from "@lottiefiles/react-lottie-player";
import { selectmobile } from "../Redux/Slices/UserSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { decreaseQuantity, increaseQuantity, removeItem, selectItems, updateCount, setCartFromDataset, selectCount } from "../Redux/Slices/CartSlice";
import { toast } from "react-toastify";

function CartItem() {
	const APP_URL = import.meta.env.VITE_APP_URL;

	// Destructure context values
	const { currency, updateQuantity } = useContext(ShopContext);
	// const [cartItems, setCartItems] = useState([]);
	const [products, setProducts] = useState([]);
	const [isLoading, setLoading] = useState(false);
	const mobileno = useSelector(selectmobile);
	const navigate = useNavigate();
	const [cartItems, setNewCartItem] = useState([]);
	const dispatch = useDispatch();
	const items = useSelector(selectItems);
	const itemCount = useSelector(selectCount)
	const [click, setClick] = useState(false)

	if (!mobileno) {
		navigate('/login')
	}

	useEffect(() => {
		const fetchData = async () => {
			setLoading(true);
			try {
				// Fetch products
				const productResponse = await axios.get(
					`${APP_URL}get-items`,
					{ withCredentials: true }
				);
				const fetchedProducts = productResponse?.data?.result;
				if (productResponse) {
					setProducts(fetchedProducts);
				}

			} catch (error) {
				console.error("Error fetching data:", error);
				setNewCartItem([]); // Reset on error
			} finally {
				setLoading(false);
			}
		};

		fetchData();

	}, [mobileno, click]);



	const fetchDataFromBAckEnd = async () => {
		try {
			const response = await axios.post(
				`${APP_URL}cart/getCarts/${mobileno}`, {}, { withCredentials: true }
			);

			if (response) {
				console.log("---------------->", response.data["result"].items);


				setNewCartItem((prevCartItems) => [...prevCartItems, ...response.data["result"].items]);

			}
		} catch (error) {
			console.log(error);
		}
	};



	console.log("products item count", products.length, "cartItem length -->", cartItems.length);

	useEffect(() => {
		console.log("fetching.......");
		// setNewCartItem((prevCartItems) => [...prevCartItems, ...items]);
		setNewCartItem(items);
		if (cartItems.length == 0) {
			console.log("-----length =0 ------->====", cartItems.length);
			fetchDataFromBAckEnd()
		}
	}, [items,click]);

	const addToCart2 = async (id, size, quantity, is_increase) => {

		if (!mobileno) {
			navigate('/login')
		}
		console.log(id, size, quantity);
		if (size) {
			try {
				const response = await axios.post(
					`${APP_URL}cart/add/${mobileno}`,
					{ id, size, quantity, is_increase }, { withCredentials: true }
				);
				if (response) {
					console.log(response.data);
					toast.success("Updated your cart");
					setClick(!click)
				}
			} catch (error) {
				if (error.response) {
					console.log("Error Response:", error.response.data);
					console.log("Error Status:", error.response.status);
				} else if (error.request) {
					console.log("Error Request:", error.request);
				} else {
					console.log("Error Message:", error.message);
				}
			}
		} else {
			toast.warn("please choose your size");
		}
	};


	// Scroll to the top on component mount
	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

	// Fetch products and cart items


	const Increase_Count = async (id, size, quantity) => {
		console.log(id, size, quantity);
		addToCart2(id, size, quantity + 1, true)
		dispatch(increaseQuantity({ itemId: id, size: size }))
		dispatch(updateCount())
	}

	const Descrease_Count = async (id, size, quantity) => {
		addToCart2(id, size, quantity - 1, false)
		dispatch(decreaseQuantity({ itemId: id, size: size }))
		dispatch(updateCount())

	}
	console.log(cartItems);

	const removeItem_from_backend = async (itemId, size) => {
		const data = {
			itemId: itemId,
			size: size
		}
		try {
			const response = await axios.delete(`${APP_URL}cart/remove_cart_item/${mobileno}`, { data }, { withCredentials: true })
			if (response) {
				console.log(response.data);
			}
		} catch (error) {
			console.log(error);
		}
	}
	console.log("cart item length", cartItems);
	return (
		<div>
			{products.length <= 0 ? (
				// Show a loading skeleton if data is still loading
				<div className="flex items-center justify-center h-screen">
					<Player
						autoplay
						loop
						src={Loader}
						style={{ height: "300px", width: "300px" }}
					/>
				</div>
			) : cartItems.length > 0 ? (
				cartItems.map((item) => {
					// Find the corresponding product details
					const productItem = products.find(
						(productItem) => productItem._id === item.itemId
					);

					if (!productItem) return null;
					return item.sizes.map((product, index) => (
						<div
							key={`${item._id}-${product.size}-${index}`}
							className="w-full h-auto sm:px-4 pb-4">
							<div className="w-full h-auto group flex mb-4 border border-gray-100 hover:bg-gray-200 sm:scale-100 text-sm sm:text-base shadow-md shadow-gray-420">
								{/* Product Image */}
								<div className="sm:w-3/4 w-5/6 flex">
									<div className="w-1/7 h-36 bg-gray-600">
										<img
											src={productItem.image[0]}
											alt={productItem.name}
											className="h-full w-full object-cover"
										/>
									</div>

									{/* Product Details */}
									<div className="w-5/7 h-full sm:p-4 flex flex-col items-start gap-y-2 ml-4">
										<p className="font-bold w-full text-left">
											{productItem.name}
										</p>

										<div className="text-sm text-gray-700 flex items-center gap-x-6">
											<p className="text-base font-semibold">
												{currency}
												{productItem.price}
											</p>
											<p className="px-2 py-2 bg-gray-200 border">
												{product.size}
											</p>
										</div>

										{/* Quantity Controls */}
										<div className="w-full h-auto flex gap-x-3 mt-2">
											<button
												className="px-1 py-1 border border-black rounded-sm"
												onClick={() => Descrease_Count(item.itemId, product.size, product.quantity)}
												disabled={product.quantity === 1}>
												<IoMdRemove className="text-xs" />
											</button>
											<p>{product.quantity}</p>
											<button
												className="px-1 py-1 border border-black rounded-sm"
												onClick={() => {
													Increase_Count(item.itemId, product.size, product.quantity)
												}}>
												<IoMdAdd className="text-xs" />
											</button>
										</div>
									</div>
								</div>

								{/* Bin Icon for Remove */}
								<div className="sm:w-1/4 w-1/6 flex items-center justify-center">
									<ImBin
										className="w-5 h-5 text-black cursor-pointer hover:scale-110"
										onClick={() => {
											removeItem_from_backend(item.itemId, product.size)
											dispatch(removeItem({ itemId: item.itemId, size: product.size }))
										}}
									/>
								</div>
							</div>
						</div>
					));
				})
			) : (
				<div className="text-center py-10 text-gray-600">
					Your cart is empty
				</div>
			)}
		</div>
	);
}

export default CartItem;
