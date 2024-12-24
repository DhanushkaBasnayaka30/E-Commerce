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
			
			return res.status(200).json(savedData);
		}
	} catch (error) {
		console.log(error);
		res.status(500).json({ Message: "Error in adding item to cart" });
	}
};

export const GetCart = async (req, res) => {
	const mobileno = req.params.id.trim();
	console.log("Mobileno type:", typeof mobileno,mobileno); // 

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

export const GetCartTotal = async (req, res) => {
  try {
    const mobile = req.params.id;
    console.log("cartController", mobile);

    // Fetch the cart for the given mobile number
    const cartTotal = await CartModule.findOne({ mobileno: mobile });

    if (!cartTotal) {
      return res.status(404).json({ message: "Cart not found" });
    }

    const items = cartTotal.items; // Assuming `items` is an array
    console.log("Items in cart:", items);

    // Use Promise.all to handle asynchronous operations inside map
    const itemDetails = await Promise.all(
			items.map(async (item) => {
				const itemId = item.itemId; // Extract itemId
				console.log("Querying ItemModule with _id:", itemId);
		
				// Fetch item details from the ItemModule using _id
				const itemDetails = await ItemModule.findOne({ _id: itemId });
		
				console.log("Fetched itemDetails:", itemDetails);
				if (!itemDetails) {
					console.warn(`Item not found for _id: ${itemId}`);
					return { itemId, message: "Item not found" };
				}
		
				const quantity = item.sizes?.[0]?.quantity || 0; // Guard for empty sizes array
				const total = itemDetails.price * quantity;
		
				return {
					itemId,
					name: itemDetails.name,
					price: itemDetails.price,
					quantity,
					total,
				};
			})
		);
		

    // Calculate the grand total
    const grandTotal = itemDetails.reduce(
      (sum, item) => sum + (item.total || 0),
      0
    );

    // Return the response
		console.log("itemDetails",itemDetails);
		console.log("total",grandTotal);

    return res.status(200).json({
      message: "Cart details retrieved successfully",
      items: itemDetails,
      grandTotal,
    });
  } catch (error) {
    console.error("Error in GetCartTotal:", error);
    return res.status(500).json({ message: "Server error", error });
  }
};
