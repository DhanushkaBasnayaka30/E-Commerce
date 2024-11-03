import CartModule from "../modules/CartModule.js";
import ItemModule from "../modules/ItemModule.js";

export const AddItem = async (req, res) => {
	console.log(req.body);
	try {
		const newItem = new ItemModule(req.body);
		const { _id } = newItem;

		const userExist = await ItemModule.findOne({ _id });

		if (userExist) {
			return res.status(400).json({ Message: `${_id} Item already exists` });
		}
		const savedData = await newItem.save();
		res.status(200).json(savedData);
	} catch (error) {
		res.status(500).json({ Message: "error in adding user" });
	}
};

export const GetItems = async (req, res) => {
	console.log("hiiii");
	try {
		// Retrieve the item by its ID from the database
		const itemId = "aaaah"; // Replace "aaaab" with the actual item ID if needed
		const item = await ItemModule.find();

		if (item) {
				// console.log(item);
			res.status(200).json({ result: item });
			// res.send(item);
		} else {
			res.status(404).json({ Message: "Item not found" });
		}
	} catch (error) {
		console.error("Error retrieving items:", error);
		res.status(500).json({ Message: "Error retrieving items" });
	}
};

export const BestSeller = async (req, res) => {
	console.log("hiiii");
	try {
		const bestSellers = await ItemModule.find({ bestseller: true });
		console.log(bestSellers.length);
		if (bestSellers) {
			res.status(200).json({ result: bestSellers });
			// res.send(item);
		} else {
			res.status(404).json({ Message: "Item not found" });
		}
	} catch (error) {
		console.error("Error retrieving items:", error);
		res.status(500).json({ Message: "Error retrieving items" });
	}
};

export const GetProduct = async (req, res) => {
	const id = req.params.id;
	console.log(id);
	try {
		const item = await ItemModule.findById(id);
		if (item) {
		
			res.status(200).json({ result: item });
		} else {
			res.status(400).json({ message: "Item not found" });
		}
	
	} catch (error) {
		console.log("Server Error connecting item", error);
	}
};

