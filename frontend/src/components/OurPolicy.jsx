import React from "react";
import { assets } from "../assets/assets";

function OurPolicy() {
	return (
		<div className="flex flex-col sm:flex-row justify-around gap-12 sm:gap-2 text-center py-20 sm:text-sm md:text-base text-gray-600 ">
			<div className="px-4 sm:px-[5vw] md:px-[7vw] lg:px-[8vw]  ">
				<img src={assets.exchange_icon} className="w-12 m-auto mb-5" alt="" />
				<p className="capitalize font-semibold">EASY EXCHANGE POLICY</p>
				<p className="text-gray-400">WE offer hassle free exchange policy</p>
			</div>
			<div className="">
				<img src={assets.quality_icon} className="w-12 m-auto mb-5" alt="" />
				<p className="capitalize font-semibold">7 days return policy</p>
				<p className="text-gray-400 capitalize">WE 7 days free return policy</p>
			</div>
			<div className="">
				<img src={assets.support_img} className="w-12 m-auto mb-5" alt="" />
				<p className="capitalize font-semibold">best customer support</p>
				<p className="text-gray-400">WE provide 24/7 customer support  policy</p>
			</div>
		</div>
	);
}

export default OurPolicy;
