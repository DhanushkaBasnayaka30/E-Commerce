import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import { assets } from "../assets/assets";
import { ImBin } from "react-icons/im";
import { IoMdAdd, IoMdRemove } from "react-icons/io";
import { IoRemove } from "react-icons/io5";
function CartItem() {
	const { cartItem, products, currency, itemCount, setItemCount,updateQuantity } =
		useContext(ShopContext);
	const [cartItems, setCartItems] = useState([]);
	const [count] = useState(false);

  useEffect(() => {
		window.scrollTo(0, 0);
	}, []);
	useEffect(() => {
		const tmpData = [];
		for (const items in cartItem) {
			for (const item in cartItem[items]) {
				if (cartItem[items][item] > 0) {
					tmpData.push({
						_id: items,
						size: item,
						quantity: cartItem[items][item],
					});
					
				}
			}
		}
		setCartItems(tmpData); // Corrected here
	}, [cartItem,count]);

	const adding = (cuurent, id) => {
		const productData = cartItems.find(
			(product) => product._id === id
		)
		console.log(productData);

    productData.quantity= cuurent+1;

		console.log(productData);

    set
    
	};
	return (
		<div className="w-full   h-auto sm:px-4 pb-4">
			{cartItems.length > 0 ? (
				cartItems.map((item, index) => {
					const productData = products.find(
						(product) => product._id === item._id
					);

					return (
						<div
							className="w-full h-auto group flex mb-4  border border-gray-100  hover:bg-gray-200 hover:border-gray-100  sm:scale-100 text-sm sm:text-base shadow-md shadow-gray-420"
							key={index}>
							<div className="sm:w-3/4 w-5/6 flex">
								{/* Product Image */}
								<div className="w-1/7 h-36 bg-gray-600">
									<img
										src={productData?.image[0] || assets.default_image}
										alt={productData?.name || "Product"}
										className="h-full w-full object-cover"
									/>
								</div>

								{/* Product Details */}
								<div className="w-5/7 h-full  sm:p-4 justify-start flex flex-col items-start gap-y-2 ml-4">
									<p className="font-bold  w-full text-left ">
										{productData?.name}
									</p>
									<div className="text-sm text-gray-700 gap-y-1 flex items-center justify-start gap-x-6">
										<p className="text-base bg-gra-800 font-semibold">
											{" "}
											{currency}
											{productData?.price}
										</p>
										<p className="px-2 py-2 bg-gray-200 border group-hover:bg-white border-gray-300">
											{" "}
											{item.size}
										</p>
									</div>
									<div className="w-full h-auto items-center flex gap-x-3 mt-2">
                  <button className="px-1 py-1 border border-black  rounded-sm "
                      onClick={()=>{updateQuantity(item._id,item.quantity-1,item.size)}}
                    >
											<IoMdRemove className="text-xs" />
										</button>
										<p>{item.quantity}</p>
										<button
											className="px-1 py-1 border border-black  rounded-sm"
                      onClick={()=>{updateQuantity(item._id,item.quantity+1,item.size)}}>
											<IoMdAdd className="text-xs" />
										</button>
										
									</div>
								</div>
							</div>

							{/* Bin Icon for Remove */}
							<div className="sm:w-1/4 w-1/6   flex items-center justify-center">
								<ImBin className="w-5 h-5   text-black cursor-pointer hover:scale-110"onClick={()=>{updateQuantity(item._id,0,item.size)}}/>
							</div>
						</div>
					);
				})
			) : (
				<p>Your cart is empty</p>
			)}
		</div>
	);
}

export default CartItem;
