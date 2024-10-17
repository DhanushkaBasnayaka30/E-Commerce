import React from "react";
import { assets } from "../assets/assets";

function Footer() {
	return (
    <>
		<div className="flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm w-full">
			<div className="">
				<img src={assets.logo} className="mb-5 w-32 " alt="" />
				<p className="w-full md:w-2/3 text-gray-600">
					Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum hic eaque
					quo. Odit maiores quibusdam quidem perferendis id ratione sed eos
					quod, debitis tempora totam vitae rem? Nisi, dolorem quisquam.
				</p>
			</div>
			<div>
				<p className="text-xl font-medium mb-5">COMPANY</p>
				<ul className="flex flex-col text-gray-600">
					<li>HOME</li>
					<li>About us</li>
					<li>Delivery</li>
					<li>Privacy policy</li>
				</ul>
			</div>
			<div>
				<p className="text-xl font-medium mb-5">GET IN TOUCH</p>
				<ul className="flex flex-col text-gray-600">
					<li>+94 773189716</li>
					<li>forever@gmail.com</li>
				</ul>
			</div>
		</div>
			<div className="w-full ">
				<hr />
				<p className="py-5 text-sm text-center ">
					Copyright 2024@ forever.com -All Rights Reserved
				</p>
			</div>
    </>
	);
}

export default Footer;
