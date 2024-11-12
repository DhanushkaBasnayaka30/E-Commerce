import React from "react";
import { FaHome } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import { AiFillProduct } from "react-icons/ai";
import { MdLogout } from "react-icons/md";

const navDetails = [
	{
		id: "1",
		title: "HOME",
		url: "/admin/dashboard",
		icon: <FaHome />,
	},
	{
		id: "2",
		title: "Products",
		url: "/admin/products",
		icon: <AiFillProduct />,
	},
	
];

function Navbar() {
	return (
		<div className="h-[900px] w-20 hover:w-40 bg-gray-300 fixed transition-width duration-300 ease-in-out top-20 group z-10">
			
			{navDetails.map((item) => (
				<NavLink
					to={item.url}
					key={item.id}
					className=" flex items-center justify-center transition-all duration-300 ease-in-out">
					<a href="">
						<div className="w-20 h-20 flex items-center justify-center overflow-hidden group-hover:w-40 gap-x-2 transition-all duration-300 ease-in-out">
							<div className="text-2xl flex items-center justify-center">
								{item.icon}
							</div>
							<p className="hidden group-hover:flex">{item.title}</p>
						</div>
					</a>
				</NavLink>
			))}
		</div>
	);
}

export default Navbar;
