import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import { Link } from "react-router-dom";

function ProductItems({ id, image, name, price }) {
	const { currency } = useContext(ShopContext);
	const [isLoading, setIsLoading] = useState(true);

	// Scroll to top when the component mounts
	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

	// Check if all props are set before disabling loading
	useEffect(() => {
		if (id && image && name && price) {
			setIsLoading(false);
		}
	}, [id, image, name, price]);

	useEffect(() => {
		const timer = setTimeout(() => {
			if (id && image && name && price) {
				setIsLoading(false);
			}
		}, 1000);
	});

	return (
		<Link to={`/product/${id}`} className="text-gray-700 cursor-pointer">
			{isLoading ? (
				// Loading Placeholder
				<div className="flex flex-col items-center justify-center h-48 bg-gray-200 animate-pulse">
					<p>Loading...</p>
				</div>
			) : (
				<>
					<div className="overflow-hidden">
						<img
							src={image[0]} // Access only the first image in the array
							alt={name} // alt text could be the product name or other descriptive text
							className="product-image"
						/>
					</div>
					<div className="flex w-full items-start flex-col">
						<p className="pt-3 pb-1 text-sm">{name}</p>
						<p className="text-sm font-semibold">
							{currency}
							{price}
						</p>
					</div>
				</>
			)}
		</Link>
	);
}

export default ProductItems;
