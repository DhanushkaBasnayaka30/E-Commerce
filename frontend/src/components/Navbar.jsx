import { useContext, useEffect, useState } from "react";
import { assets } from "../assets/assets";
import { Link, NavLink } from "react-router-dom";
import SearchBar from "./SearchBar";
import { ShopContext } from "../context/ShopContext";

const navDetails = [
	{
		id: "1",
		title: "HOME",
		url: "/",
	},
	{
		id: "2",
		title: "COLLECTION",
		url: "/collection",
	},
	{
		id: "3",
		title: "ABOUT",
		url: "/about",
	},
	{
		id: "4",
		title: "CONTACT",
		url: "/contact",
	},
	
];

function Navbar() {
	const [visible, setVisible] = useState(false);
 

	const { search, setSearch, showSearch, setShowSearch, fetchItemCount ,cartItem,itemCount} =
		useContext(ShopContext);

		
			
	return (
		<>
			<div className="sm:left-[5%] mx-auto flex justify-between py-5 font-medium sm:w-[90%] w-full  fixed z-50  bg-white top-0 flex-col px-2">
				<div className=" flex bg-white justify-between ">
					<div className="animate-bounce animate-infinite animate-ease-in-out animate-normal" >
						{/* brandlogo */}
						<img src={assets.logo} alt="" className="w-36" />
					</div>
					{/* center */}
					<div className=" items-center justify-center sm:flex hidden ">
						<ul className="flex gap-x-8 ">
							{navDetails.map((item) => (
								<NavLink
									to={item.url}
									key={item.id}
									className="flex flex-col items-center">
									<p>{item.title}</p>
									<hr
										className={`${
											item.id === "5"
												? "text-sm "
												: "w-2/4 border-none h-[1.9px] bg-gray-900 hidden"
										}`}
									/>
								</NavLink>
							))}
						</ul>
					</div>
					{/* Right */}
					<div className="flex items-center gap-6 ">
						<img
							src={assets.search_icon}
							className="w-5 cursor-pointer"
							alt=""
							onClick={() => setShowSearch(!showSearch)}
						/>

						<div className="group relative">
							<img
								src={assets.profile_icon}
								className="w-5 cursor-pointer"
								alt=""
							/>
							<div className="group-hover:block hidden absolute dropdown-menu left-[-75px] m-auto pt-4">
								<div className="flex flex-col gap-y-4 w-36 px-5 bg-gray-200 font-semibold text-gray-900 rounded pb-2">
									<p className="cursor-pointer hover:text-black font-semibold">
										My Profile
									</p>
									<p className="cursor-pointer hover:text-black font-semibold">
										Orders
									</p>
									<p className="cursor-pointer hover:text-black font-semibold">
										Admin
									</p>
									<p className="cursor-pointer hover:text-black font-semibold">
										Logout
									</p>
								</div>
							</div>
						</div>
						<div className=" relative">
							<Link to="/cart">
								<img src={assets.cart_icon} alt="" className="w-6 h-6" />

								<span className="absolute w-5 text-sm text-white leading-4  right-[-10px] bottom-[-8px] bg-gray-900 rounded-full">
									{itemCount} {/* Call the function */}
								</span>
							</Link>
						</div>
						<img
							src={assets.menu_icon}
							className="w-5 cursor-pointer sm:hidden"
							alt=""
							onClick={() => {
								setVisible(true);
							}}
						/>
					</div>
					{/* mobile sidebar */}
					<div
						className={`  absolute top-0 right-0 overflow-hidden bg-white h-screen transition-all duration-600 ${
							visible ? " w-full" : "w-0"
						}`}>
						<div className="flex flex-col ">
							<div
								className="flex items-center gap-4 p-3 cursor-pointer"
								onClick={() => setVisible(false)}>
								<img
									src={assets.dropdown_icon}
									className="h-4 rotate-180"
									alt=""
								/>

								<p className="text-gray-600 hover:text-gray-900">Back</p>
							</div>

							<div className="flex flex-col  gap-y-4">
								{navDetails.map((item) => (
									<NavLink
										to={item.url}
										key={item.id}
										className="flex flex-col items-start ml-6 py-2 border-b border-gray-200">
										<p
											className="text-gray-600 hover:text-gray-900"
											onClick={() => setVisible(false)}>
											{item.title}
										</p>
									</NavLink>
								))}
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}

export default Navbar;
