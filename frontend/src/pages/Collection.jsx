import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import { assets } from "../assets/assets";
import Title from "../components/Title";
import ProductItems from "../components/ProductItems";
import { Prev } from "react-bootstrap/esm/PageItem";

function Collection() {
	const { products } = useContext(ShopContext);
	const [showFilter, setShowFilter] = useState(false); // Fixed spelling of showFilter
	const [productsItems, setProductItems] = useState([]);
	const [filterproductsItems, setFilterProductItems] = useState([]);
	const [category, setCategory] = useState([]);
	const [subCategory, setSubcategory] = useState([]);
	const [sortType, setSortType] = useState("relevent");
	const { search, setSearch, showSearch, setShowSearch } =
		useContext(ShopContext);

	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

	useEffect(() => {
		setProductItems(products);
	}, [products]);

	const toggleCategory = (e) => {
		if (category.includes(e.target.value)) {
			setCategory((Prev) => Prev.filter((item) => item !== e.target.value));
		} else {
			setCategory((prev) => [...prev, e.target.value]);
		}
	};

	const subtoggleCategory = (e) => {
		if (subCategory.includes(e.target.value)) {
			setSubcategory((Prev) => Prev.filter((item) => item !== e.target.value));
		} else {
			setSubcategory((prev) => [...prev, e.target.value]);
		}
	};
	const applyFiltter = () => {
		let productCopy = products.slice();

		if (showSearch && search) {
			productCopy = productCopy.filter((item) =>
				item.name.toLowerCase().includes(search.toLowerCase())
			);
		}
		if (category.length > 0) {
			productCopy = productCopy.filter((item) =>
				category.includes(item.category)
			);
		}
		if (subCategory.length > 0) {
			productCopy = productCopy.filter((item) =>
				subCategory.includes(item.subCategory)
			);
		}
		setFilterProductItems(productCopy);
	};
	useEffect(() => {
		applyFiltter();
	}, [category, subCategory, search, showSearch]);

	const sortPrice = () => {
		let filltercopy = filterproductsItems.slice();
		switch (sortType) {
			case "low-high":
				setFilterProductItems(filltercopy.sort((a, b) => a.price - b.price));
				break;

			case "high-low":
				setFilterProductItems(filltercopy.sort((a, b) => b.price - a.price));
				break;

			default:
				applyFiltter();
				break;
		}
	};
	useEffect(() => {
		sortPrice();
	}, [sortType]);
	return (
		<div
			className="flex flex-col sm:flex-row gap-1 sm:gap-10 border-1 transition-all duration-500"
			style={{
				paddingTop: showSearch ? "12rem" : "6rem",
				paddingBottom: showSearch ? "12rem" : "6rem",
			}}>
			{/* filterOption */}
			<div className="min-w-60 sm:fixed bg-white z-10 sm:mt-8">
				<p
					className="my-2 text-xl flex items-center cursor-pointer gap-2"
					onClick={() => setShowFilter(!showFilter)} // Toggle filter visibility
				>
					FILTERS
					<img
						src={assets.dropdown_icon}
						className={`h-3 sm:hidden ${showFilter ? "rotate-90" : ""}`} // Fixed template literal for rotation
						alt=""
					/>
				</p>

				{/* CATEGORIES FILTER */}
				<div
					className={`border border-gray-300 pl-5 py-3 mt-6 flex flex-col ${
						showFilter ? "" : "hidden sm:flex"
					}`} // Fixed template literal for conditional class rendering
				>
					<p className="mb-3 text-sm font-medium sm:text-base text-start">
						CATEGORIES
					</p>
					<div className="flex gap-y-3 flex-col text-sm font-light text-gray-700">
						{
							// Filter duplicates based on the `category`
							[...new Set(productsItems.map((item) => item.category))].map(
								(category, index) => (
									<div
										key={index}
										className="justify-start flex items-center sm:text-base gap-x-2 mx-auto w-full">
										<input
											type="checkbox"
											value={category}
											className="w-4"
											onChange={toggleCategory}
										/>
										{category}
									</div>
								)
							)
						}
					</div>
				</div>

				{/* SUBCATEGORY FILTER */}
				<div
					className={`border border-gray-300 pl-5 py-3 my-5 ${
						showFilter ? "" : "hidden sm:flex flex-col"
					}`} // Fixed template literal for conditional class rendering
				>
					<p className="mb-3 text-sm font-medium sm:text-base text-start capitalize">
						Subcategory
					</p>
					<div className="flex gap-y-3 flex-col text-sm font-light text-gray-700">
						{
							// Filter duplicates based on the `subcategory`
							[...new Set(productsItems.map((item) => item.subCategory))].map(
								(subCategory, index) => (
									<div
										key={index}
										className="justify-start flex items-center sm:text-base gap-x-2 mx-auto w-full">
										<input
											type="checkbox"
											value={subCategory}
											className="w-4"
											onChange={subtoggleCategory}
										/>
										{subCategory}
									</div>
								)
							)
						}
					</div>
				</div>
				<div
					className={`  py-3 my-5  ${
						showFilter ? "" : "hidden sm:flex flex-col"
					}`} // Fixed template literal for conditional class rendering
				>
					<div className="flex gap-y-3 flex-col text-sm font-light text-gray-900">
						<div className="flex justify-between mb-4  text-base sm:text-2xl ">
							{/* PRODUCT Sort */}
							<select
								className="border-2 border-gray-900 rounded text-sm px-2 w-[100%] h-8 bg-white "
								onChange={(e) => setSortType(e.target.value)}>
								<option className="mt-4" value="relevent">
									Sort by: Relevent
								</option>
								<option value="low-high">Sort by: Low to High</option>
								<option value="high-low">Sort by: High to Low</option>
							</select>
						</div>
					</div>
				</div>
			</div>

			{/* RightSide */}
			<div className="flex-1 sm:ml-64  ">
				<div className="flex justify-center sm:justify-start mb-4  text-base sm:text-2xl  ">
					<Title text1={"ALL"} text2={"COLLECTION"} />
					{/* PRODUCT Sort */}
				</div>

				{/* map Product */}
				<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-4  p-2 py-4  border-gray-400">
					{filterproductsItems.map((item, index) => (
						<ProductItems
							key={index}
							name={item.name}
							price={item.price}
							image={item.image}
							id={item._id}
						/>
					))}
				</div>
			</div>
		</div>
	);
}

export default Collection;
