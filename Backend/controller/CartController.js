import CartModule from "../modules/CartModule.js";
import ItemModule from "../modules/ItemModule.js";

export const AddCart = async (req, res) => {
	const mobileno = req.params.id;
	// console.log(req.body);
	const size = {
		size: req.body.size,
		quantity: req.body.quantity,
	};

	const cartItem = { itemId: req.body.id, sizes: size };

	try {
		// Check if a cart already exists for this mobile number
		const userCart = await CartModule.findOne({ mobileno });
		console.log(userCart);
		if (userCart) {
			// If cart exists, check if the item is already in the cart
			const existingItemIndex = userCart.items.findIndex(
				(item) => item.itemId === cartItem.itemId
			);

			if (existingItemIndex !== -1) {
				// If the item already exists, update the quantity and/or size
				userCart.items[existingItemIndex].sizes.push(cartItem.sizes);
			} else {
				// Otherwise, add the new item to the cart
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
			console.log("newCart", newCart);
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
