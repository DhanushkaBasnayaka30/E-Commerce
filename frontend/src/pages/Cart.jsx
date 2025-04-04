import Title from "../components/Title";
import CartItem from "../components/CartItem";
import Bill from "../components/Bill";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { selectmobile } from "../Redux/Slices/UserSlice";

function Cart() {

	const mobile = useSelector(selectmobile);


	return (
		<>
			<div className="h-auto w-full pt-20 px-2">
				<div className="w-full text-left ml-4 text-2xl mt-4">
					<Title text1={"YOUR"} text2={"CART"} className="" />
				</div>
				{/* carts */}
				<div className=" sm:mt-4 mt-8">
					<CartItem />
				</div>
				{/* -------------------------- */}
				{/* bill */}
				<div className="w-full flex items-center justify-end mt-8 sm:mt-2">
					<div className="h-[300px] py-12 w-full bg-gray-100 border:gray-200 sm:w-4/5 md:w-3/5 lg:w-3/5 xl:w-1/2 flex flex-col">
						{/* heading */}
						<Bill />
						<Link to="/place-order" className="w-full">
							<div className="w-full  right-0  h-12 flex justify-end items-center mt-8 px-2 sm:px-0 ">

							</div>
						</Link>
					</div>
				</div>
			</div>
		</>
	);
}

export default Cart;
