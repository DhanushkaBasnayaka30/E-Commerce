import OrderSchema from "../modules/OrderModule.js";
import ItemModule from "../modules/ItemModule.js";

export const AddCart = async (req, res) => {
  try {
    // Extract form data and items from the request body
    const { formData, items } = req.body;

    // Logging the incoming form data and items
    console.log(formData["first_name"]);
    console.log(items);

    // Constructing the address
    const address = `${formData["zipcode"]}, ${formData["street"]}, ${formData["city"]}, ${formData["state"]}`;
    console.log("Address: ", address);

    // Constructing the full name
    const name = `${formData["first_name"]} ${formData["last_name"]}`;

    // Extracting mobile number from the form data
    const mobile = formData["phone"];
    console.log("Mobile Number: ", mobile);

    // Creating the new order schema
    const OrderCart = new OrderSchema({
      Mobileno: mobile,
      Customer_Name: name,
      Customer_Address: address,
      Total_Amount: 100, // You can calculate this dynamically based on items
      items: items,
    });

    // Saving the order to the database
    const savedData = await OrderCart.save();
    console.log("Saved Order: ", savedData);

    // Returning the successful response
    return res.status(200).json({
      success: true,
      message: "Order added successfully!",
      data: savedData
    });

  } catch (error) {
    // Catching and logging any errors
    console.error("Error adding to cart:", error);

    // Sending the error response
    return res.status(500).json({
      success: false,
      message: "There was an error processing your order.",
      error: error.message
    });
  }
};


export const GetCart = async (req, res) => {
	const mobileno = req.params.id.trim();
	console.log("Mobileno type:", typeof mobileno, mobileno); //

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
		console.log("itemDetails", itemDetails);
		console.log("total", grandTotal);

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
