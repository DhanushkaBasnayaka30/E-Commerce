import CartModule from "../modules/CartModule.js";
import ItemModule from "../modules/ItemModule.js";

export const AddCart = async (req, res) => {
	const mobileno = req.params.id;
	console.log(req.body.is_increase);
	const size = {
		size: req.body.size,
		quantity: req.body.quantity,
	};
	
	console.log("sizes ----------->", size);
	const cartItem = { itemId: req.body.id, sizes: size };

	try {
		// Check if a cart already exists for this mobile number
		const userCart = await CartModule.findOne({ mobileno });

		if (userCart) {
			// If cart exists, check if the item is already in the cart
			const existingItemIndex = userCart.items.findIndex(
				(item) => item.itemId === cartItem.itemId
			);
			console.log("existingItemIndex",existingItemIndex);
			if (existingItemIndex !== -1) {
				// If the item already exists, update the quantity and/or size

				const existingItem = userCart.items[existingItemIndex];

				const existingSizeIndex = existingItem.sizes.findIndex(
					(sizeObj) => sizeObj.size === cartItem.sizes["size"]
				);
				console.log("~~~~~~~~~~~~", cartItem.sizes["quantity"]);
				if (existingSizeIndex !== -1) {
					// If the size exists, update the quantity
					if (req.body.is_increase) {
						existingItem.sizes[existingSizeIndex]["quantity"] += 1;
					} else {
						if (existingItem.sizes[existingSizeIndex]["quantity"] > 0) {
							existingItem.sizes[existingSizeIndex]["quantity"] -= 1;
						}
					}
				} else {
					// If the size does not exist, add the new size
					existingItem.sizes.push(cartItem.sizes[0]);
				}
			} else {
				// Otherwise, add the new item to the cart
				console.log("new",cartItem);
				userCart.items.push(cartItem);
			}
			
			const updatedCart = await userCart.save();
			return res.status(200).json(updatedCart);
		} else {
			// If cart does not exist, create a new cart document
			const newCart = new CartModule({
				mobileno: mobileno,
				items: [cartItem],
			});

			const savedData = await newCart.save();
			// console.log("newCart", newCart);
			return res.status(200).json(savedData);
		}
	} catch (error) {
		console.log(error);
		res.status(500).json({ Message: "Error in adding item to cart" });
	}
};

export const GetCart = async (req, res) => {
	const mobileno = req.params.id.trim();
	console.log("Mobileno type:", typeof mobileno); // Should log 'string'
	console.log("Mobileno value:", mobileno);

	try {
		const cart = await CartModule.findOne({ mobileno });
		if (cart) {
			// console.log("Cart found:", cart);
			res.status(200).json({ result: cart });
		} else {
			console.log("Cart not found");
			res.status(404).json({ message: "Cart not found" });
		}
	} catch (error) {
		console.log("Error fetching cart:", error);
		res.status(500).json({ message: "Error retrieving cart" });
	}
};
export const GetCartsbyMobile = async (req, res) => {
	console.log("get carts");
	const { mobileno } = req.params.id.trim();

	try {
		const cart = await CartModule.findOne(mobileno);
		if (cart) {
			console.log("Cart found:", cart);
			res.status(200).json({ result: cart });
		} else {
			console.log("Cart not found");
			res.status(404).json({ message: "Cart not found" });
		}
	} catch (error) {
		console.log("Error fetching cart:", error);
		res.status(500).json({ message: "Error retrieving cart" });
	}
};

export const RemoveCartItem = async (req, res) => {
	console.log("welcome to removing");
	try {
		const mobileno = req.params.id;
		const { itemId, size } = req.body;
		console.log(mobileno, itemId);
		// Find the user's cart
		const userCart = await CartModule.findOne({ mobileno });
		console.log("usertCArt-->", userCart);
		if (!userCart) {
			return res.status(404).json({ message: "Cart not found" });
		}

		// Find the index of the item in the cart
		const itemIndex = userCart.items.findIndex(
			(item) => item.itemId === itemId
		);
		console.log("existing cart iterm index", itemIndex);
		if (itemIndex === -1) {
			return res.status(404).json({ message: "Item not found in cart" });
		}

		// Filter out the specific size from the item's sizes array
		userCart.items[itemIndex].sizes = userCart.items[itemIndex].sizes.filter(
			(sizeObj) => sizeObj.size !== size
		);

		// If all sizes are removed, remove the entire item
		if (userCart.items[itemIndex].sizes.length === 0) {
			userCart.items.splice(itemIndex, 1);
		}

		// Save the updated cart
		await userCart.save();

		return res
			.status(200)
			.json({ message: "Item size removed successfully", cart: userCart });
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: "Error in removing item size from cart" });
	}
};
