import React, { useContext, useEffect } from "react";
import { ShopContext } from "../context/ShopContext";
import { Link } from "react-router-dom";
import { productImages } from "../assets/assets";

function ProductItems({ id, image, name, price }) {
	const { currency } = useContext(ShopContext);

	useEffect(() => {
		// Scroll to top when the component mounts
		window.scrollTo(0, 0);
	}, []);

	return (
		<Link to={`/product/${id}`} className="text-gray-700 cursor-pointer">
			<div className="overflow-hidden">
				<img
					src={productImages[image[0]]} // Access only the first image in the array
					alt={name} // alt text could be the product name or other descriptive text
					className="product-image" // add any relevant className if needed
				/>
			</div>
			<div className="flex w-full items-start flex-col">
				<p className="pt-3 pb-1 text-sm ">{name}</p>
				<p className="text-sm font-semibold">
					{currency}
					{price}
				</p>
			</div>
		</Link>
	);
}

export default ProductItems;
