import React, { useContext } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "./Title";
import { Link } from "react-router-dom";

function Bill() {
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
						{currency} {getCartAmount()}.00
					</p>
				</div>
				<hr  />
				<div className="flex justify-between">
					<p>Shipping Free</p>
					<p>
						{currency} {delivery_fee}.00
					</p>
				</div>
				<hr />

				<div className="flex justify-between">
					<p>Total</p>
					<p>$ {delivery_fee + getCartAmount()}.00</p>
				</div>
				<hr />

				
			</div>
		</div>
	);
}

export default Bill;
