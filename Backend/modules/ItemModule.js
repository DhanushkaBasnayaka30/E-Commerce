import mongoose from "mongoose";

const itemSchema = new mongoose.Schema({
	_id: {
		type: String,
		required: true,
	},
	name: {
		type: String,
		required: true,
	},
	description: {
		type: String,
		required: true,
	},
	price: {
		type: Number,
		required: true,
	},
	image: [
		{
			type: String, // Assuming you're storing image URLs or paths as strings
			required: true,
		},
	],
	category: {
		type: String,
		required: true,
	},
	subCategory: {
		type: String,
		required: true,
	},
	review: {
		type: [String], // Array of strings for sizes (e.g., ["S", "L", "XL"])
		required: false,
	},
	sizes: {
		type: [String], // Array of strings for sizes (e.g., ["S", "L", "XL"])
		required: true,
	},
	date: {
		type: Date, // Storing as a JavaScript Date object
		default: Date.now, // Automatically sets the current date if not provided
	},
	bestseller: {
		type: Boolean,
		default: false, // Default value for bestseller
	},
});

export default mongoose.model("items", itemSchema);
