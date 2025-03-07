import React, { useState } from "react";
import Title from "../components/Title";
import Bill from "../components/Bill";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { selectItems, removeItem } from "../Redux/Slices/CartSlice";
import { selectmobile, selectName } from "../Redux/Slices/UserSlice";
import axios from "axios";
import { toast } from "react-toastify";

function PlaceOrder() {

	const items = useSelector(selectItems)
	const name = useSelector(selectName)
	const mobile = useSelector(selectmobile)
	console.log(items, name);
	const APP_URL = import.meta.env.VITE_APP_URL;
	const dispatch = useDispatch();

	const [formData, setFormData] = useState({
		first_name: "",
		last_name: "",
		email: "",
		street: "",
		city: '',
		state: '',
		zipcode: '',
		country: '',
		phone: mobile
	})

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData((prev) => ({
			...prev,
			[name]: value,
		}))

	}

	const handleSubmit = async (e) => {
		e.preventDefault();

		// Check if any required field is missing
		if (
			!formData.first_name ||
			!formData.last_name ||
			!formData.email ||

			!formData.city ||
			!formData.zipcode ||
			!formData.country ||
			!formData.phone
		) {
			toast.error("Please fill in all required fields.");
			return;
		}

		try {
			const response = await axios.post(
				`${APP_URL}order/add`,
				{ formData, items },
				{ withCredentials: true }
			);

			if (response) {
				toast.success("Order placed successfully!");

				for (var i = 0; i < items.length; i++) {
					var { itemId, sizes } = items[i];
					for (var j = 0; j < sizes.length; j++) {

						var size = sizes[j]["size"]

						dispatch(removeItem({ itemId, size }));



					}
				}

			}
		} catch (error) {
			toast.error("An error occurred while placing the order.");
			console.log(error);
		}
	};

	return (
		<div className="pt-20">
			<form onSubmit={handleSubmit} className="w-full h-full flex gap-y-8 flex-col px-2 sm:px-0">
				<div className="w-full  h-auto">
					{/* heading */}
					<div className="text-2xl w-fll text-left md:mt-16">
						<Title text1={"DELIVERY"} text2={"INFORMATION"} className="" />
					</div>
					{/* main */}
					<div className=" h-full mt-4 flex md:flex-row justify-between  flex-col">
						{/* left */}
						<div className="w-full md:w-5/12  h-full flex gap-y-4 flex-col">
							<div className="w-full gap-x-2 flex">
								<input
									type="text"
									className="w-1/2 border border-gray-600 h-9 outline-none text-sm pl-2 rounded-md"
									placeholder="first name"
									required
									onChange={handleChange}
									name="first_name"
								/>
								<input
									name="last_name"
									type="text"
									className="w-1/2  border-gray-600 border h-9 pl-2 text-sm outline-none rounded-md"
									placeholder="last name"
									required onChange={handleChange}
								/>
							</div>
							<div className="w-full gap-x-2 flex">
								<input
									name="email"
									type="text"
									className="w-full border border-gray-600 h-9 outline-none text-sm pl-2 rounded-sm"
									placeholder="Email"
									required onChange={handleChange}
								/>
							</div>
							<div className="w-full gap-x-2 flex">
								<input
									name="street"
									type="text"
									className="w-full border border-gray-600 h-9 outline-none text-sm pl-2 rounded-md"
									placeholder="Street"
									onChange={handleChange}
								/>
							</div>
							<div className="w-full gap-x-2 flex">
								<input
									name="city"
									type="text"
									className="w-1/2 border border-gray-600 h-9 outline-none text-sm pl-2 rounded-md"
									placeholder="City"
									required onChange={handleChange}
								/>
								<input
									name="state"
									type="text"
									className="w-1/2  border-gray-600 border h-9 pl-2 text-sm outline-none rounded-md"
									placeholder="State"
									required onChange={handleChange}
								/>
							</div>
							<div className="w-full gap-x-2 flex">
								<input
									type="text"
									name="zipcode"
									className="w-1/2 border border-gray-600 h-9 outline-none text-sm pl-2 rounded-md"
									placeholder="Zipcode"
									required onChange={handleChange}
								/>
								<input

									name="country" type="text"
									className="w-1/2  border-gray-600 border h-9 pl-2 text-sm outline-none rounded-md"
									placeholder="Country"
									required onChange={handleChange}
								/>
							</div>
							<div className="w-full gap-x-2 flex">
								<input
									name="phone"
									value={formData.phone}
									type="text"
									className="w-full border border-gray-600 h-9 outline-none text-sm pl-2 rounded-md"
									placeholder="Phone"
									required onChange={handleChange}
								/>
							</div>
						</div>
						{/* right */}
						<div className="w-full mt-12 md:w-5/12  h-full">
							<Bill />


							<div className="w-full  right-0  h-12 flex justify-end items-center mt-8 ">
								<button className="2/5 sm:w-1/2 bg-gray-800 hover:bg-gray-900 h-full text-white text-center  text-xs sm:text-sm cursor-pointer flex items-center justify-center px-12 py-2 uppercase" >
									Place Order
								</button>

							</div>

						</div>
					</div>
				</div>
			</form>
		</div>
	);
}

export default PlaceOrder;
