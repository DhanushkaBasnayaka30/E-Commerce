import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import { assets } from "../assets/assets";
import Title from "../components/Title";
import ProductItems from "../components/ProductItems";

function Collection() {
	const { products } = useContext(ShopContext);
	const [showFilter, setShowFilter] = useState(false);
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
		let filterCopy = filterproductsItems.slice();
		switch (sortType) {
			case "low-high":
				setFilterProductItems(filterCopy.sort((a, b) => a.price - b.price));
				break;

			case "high-low":
				setFilterProductItems(filterCopy.sort((a, b) => b.price - a.price));
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
		<>
			<div className="w-auto  hidden top-0 sm:flex ransition-all duration-500 ">
				<div
					className="min-w-60 sm:fixed top-20  z-10 h-auto sm:mt-8 p-4 animate-fade-down animate-once animate-duration-1000 animate-delay-100 animate-ease-in-out animate-normal "
					style={{
						paddingTop: showSearch ? "6rem" : "0rem",
						paddingBottom: showSearch ? "6rem" : "0rem",
					}}>
					<p
						className="my-2 text-xl flex items-center cursor-pointer gap-2 "
						onClick={() => setShowFilter(!showFilter)}>
						FILTERS
						<img
							src={assets.dropdown_icon}
							className={`h-3 sm:hidden ${showFilter ? "rotate-90" : ""}`}
							alt=""
						/>
					</p>

					{/* Categories Filter */}
					<div
						className={`border border-gray-300 pl-5 py-3 mt-6 flex flex-col ${
							showFilter ? "" : "hidden sm:flex"
						}`}>
						<p className="mb-3 text-sm font-medium sm:text-base text-start">
							CATEGORIES
						</p>
						<div className="flex gap-y-3 flex-col text-sm font-light text-gray-700">
							{[...new Set(productsItems.map((item) => item.category))].map(
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
							)}
						</div>
					</div>

					{/* Subcategory Filter */}
					<div
						className={`border border-gray-300 pl-5 py-3 my-5 ${
							showFilter ? "" : "hidden sm:flex flex-col"
						}`}>
						<p className="mb-3 text-sm font-medium sm:text-base text-start">
							Subcategory
						</p>
						<div className="flex gap-y-3 flex-col text-sm font-light text-gray-700">
							{[...new Set(productsItems.map((item) => item.subCategory))].map(
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
							)}
						</div>
					</div>

					{/* Sort By Price */}
					<div
						className={`py-3 my-5 ${
							showFilter ? "" : "hidden sm:flex flex-col"
						}`}>
						<div className="flex gap-y-3 flex-col text-sm font-light text-gray-900">
							<div className="flex justify-between mb-4 text-base sm:text-2xl">
								<select
									className="border-2 border-gray-900 rounded text-sm px-2 w-[100%] h-8 bg-white"
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
			</div>
			<div
				className={`flex flex-col sm:flex-row gap-1 sm:gap-10 border-1 transition-all duration-500 animate-fade-down animate-once animate-duration-1000 animate-delay-100 animate-ease-in-out animate-normal ${
					showSearch ? "pt-48 pb-48" : "pt-16 pb-24"
				} sm:pt-24 sm:pb-8`}>
				{/* Filter Option */}

				{/* RightSide */}
				<div className="flex-1 sm:ml-64">
					<div className="flex justify-center sm:justify-start mb-4 text-xl sm:text-2xl">
						<Title text1={"ALL"} text2={"COLLECTION"} />
					</div>
					{/* mobile filters */}

					<div className="w-auto top-0 sm:hidden">
						<div className="min-w-60 sm:fixed top-2 z-10 h-auto  ">
							<div
								className="border flex w-full justify-start gap-x-1items-center px-2 py-1  cursor-pointer "
								>
								<div className="flex items-center border px-4 rounded border-gray-700 gap-x-2 justify-center " onClick={() => setShowFilter(!showFilter)}>
									<p className="my-2 text-base flex items-center gap-2 ">
										FILTERS
									</p>
									<img
										className="w-5 h-5"
										src="https://img.icons8.com/material-two-tone/24/vertical-settings-mixer.png"
										alt="vertical-settings-mixer"
									/>
								</div>

								<div className={`  w-1/2 flex items-center justify-center ${showFilter ? "" : ""}`}>
									<div className="flex gap-y-3 flex-col text-sm font-light text-gray-900">
										<div className="flex justify-between  text-base sm:text-2xl">
											<select
												className="border border-gray-900 rounded text-sm px-2 w-[100%] h-11 bg-white"
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

							{/* Categories Filter */}
							<div
								className={`border border-gray-300 pl-5 sm:py-3 sm:mt-6 flex flex-col transition-all duration-300 ${
									showFilter
										? "max-h-screen opacity-100"
										: "max-h-0 opacity-0 overflow-hidden"
								}`}>
								<p className="mb-3 text-sm font-medium sm:text-base text-start">
									CATEGORIES
								</p>
								
								<div className="flex gap-y-3 flex-col text-sm font-light text-gray-700">
									{[...new Set(productsItems.map((item) => item.category))].map(
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
									)}
								</div>
							</div>

							{/* Subcategory Filter */}
							<div
								className={`border border-gray-300 pl-5 py-3 sm:my-5 flex flex-col transition-all duration-300 ${
									showFilter
										? "max-h-screen opacity-100"
										: "max-h-0 opacity-0 overflow-hidden"
								}`}>
								<p className="mb-3 text-sm font-medium sm:text-base text-start">
									Subcategory
								</p>
								<div className="flex gap-y-3 flex-col text-sm font-light text-gray-700">
									{[
										...new Set(productsItems.map((item) => item.subCategory)),
									].map((subCategory, index) => (
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
									))}
								</div>
							</div>

							
						</div>
					</div>

					{/* Map Product */}
					<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-4 p-2 py-4 border-gray-400">
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
		</>
	);
}

export default Collection;
