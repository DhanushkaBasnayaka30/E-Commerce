import React from "react";
import { assets } from "../assets/assets";

function Footer() {
	return (
    <div className="sm:w-[90%] mx-auto">
		<div className="flex bg-black flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14  mt-44 text-sm w-full px-2 h-[300px] items-center px-8">
			<div className="">
				<img src={assets.logo} className="mb-5 w-32 border rounded-full bg-white h-32 object-contain bg-center " alt="" />
				<p className="w-full md:w-2/3 text-gray-100 text-left">
					Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum hic eaque
					quo. Odit maiores quibusdam quidem perferendis id ratione sed eos
					quod, debitis tempora totam vitae rem? Nisi, dolorem quisquam.
				</p>
			</div>
			<div>
				<p className="text-xl font-medium mb-5 text-white w-full text-start">COMPANY</p>
				<ul className="flex flex-col text-gray-100 items-start">
					<li>HOME</li>
					<li>About us</li>
					<li>Delivery</li>
					<li>Privacy policy</li>
				</ul>
			</div>
			<div>
				<p className="text-xl font-medium mb-5 text-start text-white">GET IN TOUCH</p>
				<ul className="flex flex-col text-gray-100 items-start">
					<li>+94 773189716</li>
					<li>forever@gmail.com</li>
				</ul>
			</div>
		</div>
			<div className="w-full  bg-black ">
				<hr />
				<p className="py-5 text-sm text-center text-white">
					Copyright 2025@ forever.com -All Rights Reserved
				</p>
			</div>
    </div>
	);
}

export default Footer;
