import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import { assets } from "../assets/assets";
import { useLocation } from "react-router-dom";

function SearchBar() {
	const { search, setSearch, showSearch, setShowSearch,visible, setVisible } =
		useContext(ShopContext);
	
	const location = useLocation();
	useEffect(() => {
		if (location.pathname === "/collection" && showSearch) {
			setVisible(true);
		} else {
			setVisible(false);
		}
	}, [location, showSearch]);


	return (
		<>
			<div
				className={`sm:py-8  w-full transition-transform transform duration-500 ease-in-out bg-white sm:bg-gray-200 rounded-b-lg overflow-hidden ${
					showSearch && visible ? "translate-y-0" : "-translate-y-full"
				}`}>
				<div className="border-t border-b  text-center  top-0   w-full sm:w-[70%] mx-auto h-full ">
					<div className="inline-flex items-center justify-center border border-gray-900 px-5 py-2 mx-3 rounded-lg w-8/9 sm:w-2/3 ">
						<input
							placeholder="Search"
							type="text"
							value={search}
							className="flex-1 outline-none bg-inherit text-sm"
							onChange={(e) => setSearch(e.target.value)}
						/>
						<img src={assets.search_icon} className="w-4" alt="" />
					</div>
					<img
						src={assets.cross_icon}
						className="inline w-3 cursor-pointer"
						alt=""
						onClick={() => setShowSearch(false)}
					/>
				</div>
			</div>
		</>
	);
}

export default SearchBar;
