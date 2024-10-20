import React from "react";
import Title from "../components/Title";
import Bill from "../components/Bill";
import { Link } from "react-router-dom";

function PlaceOrder() {
	return (
    <div className="pt-20">
      <form className="w-full h-full flex gap-y-8 flex-col px-2 sm:px-0">
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
								/>
								<input
									type="text"
									className="w-1/2  border-gray-600 border h-9 pl-2 text-sm outline-none rounded-md"
									placeholder="last name"
                  required
								/>
							</div>
							<div className="w-full gap-x-2 flex">
								<input
									type="text"
									className="w-full border border-gray-600 h-9 outline-none text-sm pl-2 rounded-sm"
									placeholder="Email"
                  required
								/>
							</div>
							<div className="w-full gap-x-2 flex">
								<input
									type="text"
									className="w-full border border-gray-600 h-9 outline-none text-sm pl-2 rounded-md"
									placeholder="Street"
                  required
								/>
							</div>
              <div className="w-full gap-x-2 flex">
								<input
									type="text"
									className="w-1/2 border border-gray-600 h-9 outline-none text-sm pl-2 rounded-md"
									placeholder="City"
                  required
								/>
								<input
									type="text"
									className="w-1/2  border-gray-600 border h-9 pl-2 text-sm outline-none rounded-md"
									placeholder="State"
                  required
								/>
							</div>
              <div className="w-full gap-x-2 flex">
								<input
									type="text"
									className="w-1/2 border border-gray-600 h-9 outline-none text-sm pl-2 rounded-md"
									placeholder="Zipcode"
                  required
								/>
								<input
									type="text"
									className="w-1/2  border-gray-600 border h-9 pl-2 text-sm outline-none rounded-md"
									placeholder="Country"
                  required
								/>
							</div>
              <div className="w-full gap-x-2 flex">
								<input
									type="number"
									className="w-full border border-gray-600 h-9 outline-none text-sm pl-2 rounded-md"
									placeholder="Phone"
                  required
								/>
							</div>
					</div>
					{/* right */}
					<div className="w-full mt-12 md:w-5/12  h-full">
						<Bill />
            
            
					<div className="w-full  right-0  h-12 flex justify-end items-center mt-8 ">
						<button   className="2/5 sm:w-1/2 bg-gray-800 hover:bg-gray-900 h-full text-white text-center  text-xs sm:text-sm cursor-pointer flex items-center justify-center px-12 py-2 uppercase" >
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
