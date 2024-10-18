import React, { useContext, useEffect } from "react";
import { ShopContext } from "../context/ShopContext";
import { Link } from "react-router-dom";

function ProductItems({ id, image, name, price }) {
	const { currency } = useContext(ShopContext);
	
		useEffect(() => {
			// Scroll to top when the component mounts
			window.scrollTo(0, 0);
		}, []); // Empty dependency array ensures this runs only on mount
	return (
		<>
			<Link to={`/product/${id}`} className="text-gray-700 cursor-pointer">
				<div className="overflow-hidden " >
					<img
						src={image[0]}
						className="hover:scale-110 transition ease-in-out"
						alt=""
					/>
				</div>
				<div className="flex w-full  items-start flex-col">
					<p className="pt-3 pb-1 text-sm ">{name}</p>
					<p className="text-sm font-semibold">
						{currency}
						{price}
					</p>
				</div>
			</Link>
		</>
	);
}

export default ProductItems;
