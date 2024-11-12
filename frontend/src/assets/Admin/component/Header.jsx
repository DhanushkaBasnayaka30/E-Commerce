import React from "react";
import { MdLogout } from "react-icons/md";
import { Link } from "react-router-dom";

function Header() {
	return (
		<div className="fixed w-full z-50 flex items-center">
			<div className="w-full h-20 bg-gray-300 flex justify-center items-center">
				<p className="text-4xl">ADMIN DAHSBOARD</p>
			</div>
			<div className="absolute right-4 flex items-center gap-3 text-xl text-white bg-gray-600 px-4 py-2 rounded">
				<button>
					<Link to="/">
						<p>logout</p>
					</Link>
				</button>
				<MdLogout />
			</div>
		</div>
	);
}

export default Header;
