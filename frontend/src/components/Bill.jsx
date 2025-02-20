import { useContext, useState } from "react";
import { useNavigate } from 'react-router-dom';

import { ShopContext } from "../context/ShopContext";
import Title from "./Title";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectCount, selectItems } from "../Redux/Slices/CartSlice";
import { useEffect } from "react";
import axios from "axios";
import { use } from "react";

function Bill() {
	const cartItems = useSelector(selectItems);
	const navigate = useNavigate();
	const orderIdies = cartItems.map((item) => item.itemId);
	const items = useSelector(selectItems);
	console.log("orderIdies", orderIdies);
	const [total, setTotal] = useState(0);
	const count = useSelector(selectCount);
	const pathSegments = location.pathname.split('/')[1];
	console.log("path name ---->>>", pathSegments); // Outputs each segment of the path as an array

	const result = cartItems.map((item) => ({
		itemId: item.itemId,
		totalQuantity: item.sizes.reduce((sum, size) => sum + size.quantity, 0),
	}));


	const count1 = useSelector(selectCount);
	console.log("count in bill", count1);

	useEffect(() => {
		const fetchData = async () => {
			const response = await axios.post(
				"http://ec2-18-163-68-87.ap-east-1.compute.amazonaws.com/api/api/get-itemPrices",
				{ result },
				{ withCredentials: true }
			);
			console.log(response.data.total);
			if (response) {
				setTotal(response.data.total);
			}
		};
		if (count > 0) {
			fetchData();

		}

	}, [count]);

	const {
		cartItem,
		products,
		currency,
		itemCount,
		setItemCount,
		updateQuantity,
		getCartAmount,
		delivery_fee,
	} = useContext(ShopContext);

	return (
		<div>
			<div className="w-full text-left ml-4 sm:text-2xl text-md">
				<Title text1={"CART"} text2={"TOTALS"} className="" />
			</div>
			{/* itema */}
			<div className="w-full px-4 mt-4 gap-y-2 flex flex-col">
				<div className="flex justify-between">
					<p>SubTotal</p>
					<p>
						{currency} {total}.00
					</p>
				</div>
				<hr />
				<div className="flex justify-between">
					<p>Shipping Free</p>
					<p>
						{currency} {delivery_fee}.00
					</p>
				</div>
				<hr />

				<div className="flex justify-between">
					<p>Total</p>
					<p>$ {delivery_fee + total}.00</p>
				</div>
				<hr />

				<div className={`${pathSegments.includes("place-order") ? "hidden" : "w-full h-12 mt-2 justify-end flex"}`}>
					<div className="2/5 sm:w-1/2 bg-gray-800 hover:bg-gray-900 h-full text-white text-center  text-xs sm:text-sm cursor-pointer flex items-center justify-center px-4 py-2" onClick={() => navigate("/place-order")} >
						PROCEED TO CHECKOUT
					</div>
				</div>
			</div>
		</div>
	);
}

export default Bill;
