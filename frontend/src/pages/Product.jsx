import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import { assets } from "../assets/assets";
import Title from "../components/Title";
import ProductItems from "../components/ProductItems";
import RleatedProduct from "../components/RleatedProduct";
function Product() {
	const { id } = useParams(); // productID is a string
	const { products, cartItem, addToCart } = useContext(ShopContext);
	const [productData, setProductData] = useState(null); // Initialize as null
	const [image, setImage] = useState("");
	const [selectedSize, setSelectedSize] = useState(null);

	useEffect(() => {
		// Wait 200 milliseconds before scrolling to the top for smooth transition
		const timer = setTimeout(() => {
			window.scrollTo({
				top: 0,
				behavior: "smooth",
			});
		}, 100);

		// Clean up the timer when the component unmounts or id changes
		return () => clearTimeout(timer);
	}, [id]);

	useEffect(() => {
		if (products && products.length > 0) {
			const product = products.find((item) => item._id === id);
			if (product) {
				setProductData(product);
				setImage(product.image[0]);
			}
		}
	}, [id, products]);

	return productData ? (
		<div className="border-t pt-10 transition-opacity ease-in duration-500 opacity-100 sm:pt-32 p-2  ">
			{/* product Data */}
			<div className="w-full h-auto flex sm:flex-row flex-col ">
				<div className="w-full sm:w-6/12 lg:w-7/12 xl:w-6/12 h-auto flex sm:flex-row flex-col-reverse gap-x-2  justify-center">
					<div className="sm:w-2/5 w-full h-auto">
						<div className=" flex w-full sm:flex-col overflow-y-scroll gap-x-1 overflow-x-auto justify-between sm:justify-normal items-center lg:h-[600px] md:h-[350px] py-4">
							{productData.image.map((item, index) => (
								<img
									key={index}
									className="lg:w-40 lg:h-40 xl:w-48 xl:h-48 w-32 h-32 object-cover bg-center sm:mb-3 flex flex-shrink-0 cursor-pointer"
									src={item}
									alt=""
									onClick={() => setImage(item)} // Allows clicking to switch the main image
								/>
							))}
						</div>
					</div>
					<div className="sm:w-3/5 w-full  flex justify-center">
						<div className="w-full  items-center justify-center md:h-[350px] lg:h-[500px] xl:w-[600px]">
							<img
								src={image}
								alt={products.name}
								className="w-full h-full object-cover"
							/>
						</div>
					</div>
				</div>
				<div className="sm:w-6/12 lg:w-5/12 xl:w-6/12 w-full h-auto  md:ml-12">
					<h1 className="w-full text-start text-2xl">{productData.name}</h1>
					<div className="flex items-center gap-1">
						<img src={assets.star_icon} className="w-3 h-3" alt="" />
						<img src={assets.star_icon} className="w-3 h-3" alt="" />
						<img src={assets.star_icon} className="w-3 h-3" alt="" />
						<img src={assets.star_icon} className="w-3 h-3" alt="" />
						<img src={assets.star_dull_icon} className="w-3 h-3" alt="" />
						<span>(122)</span>
					</div>
					{/* price */}
					<span className="w-full flex text-2xl mt-4 font-semibold">
						${productData.price}
					</span>
					{/* description */}
					<div>
						<p className="w-full text-left mt-8 text-gray-500 text-lg">
							{productData.description}
						</p>
					</div>
					{/* size */}
					<div className=" flex w-full  items-center justify-start gap-x-2 h-auto  mt-8">
						{productData.sizes.map((item, index) => (
							<span
								key={index}
								onClick={() => setSelectedSize(item)} // Set the clicked size as selected
								className={`w-auto px-4 py-2 text-lmd cursor-pointer border bg-gray-200
            ${selectedSize === item ? "border-orange-500" : "border-gray-300"} 
            transition-colors duration-300`}>
								{item}
							</span>
						))}
					</div>
					{/* Add Cart */}
					<div className=" flex w-full mt-8">
						<p
							className="bg-gray-800 hover:bg-gray-900 cursor-pointer w-32 text-white text-sm py-3"
							onClick={() => {
								addToCart(productData._id, selectedSize);
							}}>
							ADD TO CART
						</p>
					</div>

					<div className="w-full text-left mt-16 text-gray-600 text-sm gap-y-1 flex flex-col lg:text-md lg:gap-y-4">
						<p>100% Original product.</p>
						<p>Cash on delivery is available on this product.</p>
						<p>Easy return and exchange policy within 7 days.</p>
					</div>
				</div>
			</div>
			<div className=" w-full h-auto mt-20 text-sm gap-x-1 border-gray-300 border  p">
				<div className=" items-center justify-start flex text-gra-800">
					<p className="px-4 py-2 bg-gray-200 border border-gray-300 cursor-pointer">
						Description
					</p>
					<p className="px-4 py-2 bg-gray-200 border border-gray-300 cursor-pointer text-gray-400">
						Reviews
					</p>
				</div>

				<div className="w-full mt-4 text-sm gap-y-2 flex flex-col px-4 py-4 ">
					<p className="text-gray-700 text-left leading-5 lg:text-md">
						An e-commerce website is an online platform that facilitates the
						buying and selling of products or services over the internet. It
						serves as a virtual marketplace where businesses and individuals can
						showcase their products, interact with customers, and conduct
						transactions without the need for a physical presence. E-commerce
						websites have gained immense popularity due to their convenience,
						accessibility, and the global reach they offer.
					</p>
					<p className="text-gray-700 text-left leading-5 lg:text-md">
						E-commerce websites typically display products or services along
						with detailed descriptions, images, prices, and any available
						variations (e.g., sizes, colors). Each product usually has its own
						dedicated page with relevant information.
					</p>
				</div>
				{/* Review */}
				<div></div>
			</div>
			{/* related product */}
			<div className="w-full h-auto mt-16">
				<div className="w-full flex items-center justify-center text-3xl h-20 ">
					<Title text1={"RELATED"} text2={"PRODUCTS"} />
				</div>
				<div className="w-full">
					<RleatedProduct
						category={productData.category}
						subCategory={productData.subCategory}
					/>
				</div>
			</div>
		</div>
	) : (
		<div className="opacity-100">Loading...</div>
	);
}

export default Product;
