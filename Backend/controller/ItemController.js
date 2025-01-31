import CartModule from "../modules/CartModule.js";
import ItemModule from "../modules/ItemModule.js";
import dotenv from "dotenv";
import { createClient } from "@supabase/supabase-js";
import { getImagesWithUrls } from "../superbaseConfig/Supabase_GetImage.js";

const supabaseUrl = "https://tutjsnlbzyrnobycqicd.supabase.co"; // Ensure this is set

const supabaseAnonKey =
	"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR1dGpzbmxienlybm9ieWNxaWNkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzA2NTQwNjcsImV4cCI6MjA0NjIzMDA2N30.rT4dx2XkRpPoRr_bqxKgRkQpaC3xJcQIiNkj0PlZK_E"; // Ensure this is set

console.log(supabaseAnonKey);
// Check for required environment variables

if (!supabaseUrl || !supabaseAnonKey) {
	console.error("Error: SUPABASE_URL and SUPABASE_ANON_KEY must be defined.");
	process.exit(1);
}

// Create Supabase client
const supabase = createClient(supabaseUrl, supabaseAnonKey);
export const AddItem = async (req, res) => {
	try {
		const files = req.files; // Get files from the request
		const itemid = req.body._id; // Get item ID from request body
		const imageNames = files.map((file) => `${itemid}-${file.originalname}`); // Create image names

		// Upload images to Supabase
		const uploadPromises = files.map(async (file) => {
			const { data, error } = await supabase.storage
				.from("itemImage") // Replace with your Supabase bucket name
				.upload(`item/${itemid}-${file.originalname}`, file.buffer, {
					contentType: file.mimetype,
				});

			if (error) {
				console.error("Upload error:", error);
				throw error; // Handle the upload error
			}

			return data; // Return uploaded file metadata
		});

		const uploadedFiles = await Promise.all(uploadPromises); // Wait for all uploads to finish

		if (uploadedFiles) {
			// Create the new item with uploaded images
			const newItem = new ItemModule({
				_id: itemid,
				name: req.body.name,
				description: req.body.description,
				price: req.body.price,
				image: imageNames,
				category: req.body.category,
				subCategory: req.body.subCategory,
				sizes: req.body.sizes,
			});

			const userExist = await ItemModule.findOne({ _id: itemid });

			if (userExist) {
				return res
					.status(400)
					.json({ Message: `${itemid} Item already exists` });
			}

			const savedData = await newItem.save(); // Save the new item to the database
			console.log("Saved Data:", savedData);
			res
				.status(200)
				.json({ Message: "Item added successfully", item: savedData });
		}
	} catch (error) {
		console.error("Error in adding item:", error);
		res
			.status(500)
			.json({ Message: "Error in adding item", error: error.message });
	}
};

export const GetItems = async (req, res) => {
	console.log("fsgsfdgsfdg");
	try {
		const items = await ItemModule.find();

		if (items && items.length > 0) {
			let folderPath = "item";
			const publicUrls = await getImagesWithUrls("itemImage", folderPath);

			// Map items to include their respective image URLs
			const itemsWithImages = items.map((item) => {
				const imageUrls = item.image.map((imgPath) => {
					// Extract the image name
					const imagename = imgPath.split("/").pop()+'.png';
					// Find the matching public URL
					const matchingUrl = publicUrls.find((img) =>
						img.url.includes(imagename)
					);
					return matchingUrl ? matchingUrl.url : null;
				});
				// console.log(imageUrls);
				return {
					_id: item._id,
					name: item.name,
					description: item.description,
					price: item.price,

					// image: imageUrls.filter((url) => url !== null), // Include only non-null URLs
					image: imageUrls,
					category: item.category,
					subCategory: item.subCategory,
					review: item.review,
					sizes: item.sizes,
					data: item.data,
					bestseller: item.bestseller,
				};
			});

			res.status(200).json({ result: itemsWithImages });
		} else {
			res.status(404).json({ Message: "No items found" });
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
			if (bestSellers && bestSellers.length > 0) {
				// Fetch all public URLs once
				let folderPath = "item";
				const publicUrls = await getImagesWithUrls("itemImage", folderPath);

				const bestSellerswith_image = bestSellers.map((item) => {


					const imageUrls = item.image.map((imgPath) => {
						const imagename = imgPath.split("/").pop();
						// Create a regex that looks for the exact image name at the end of the URL
						const regex = new RegExp(`${imagename}.png`);
					console.log("regex",regex);
						const matchingUrl = publicUrls.find((img) => regex.test(img.url));
					
						console.log(imagename + ' --> ' + (matchingUrl ? matchingUrl.url : 'Not found'));
						return matchingUrl ? matchingUrl.url : null;
					});
					

					return {
						_id: item._id,
						name: item.name,
						description: item.description,
						price: item.price,
						image: imageUrls.filter((url) => url !== null), // Include only non-null URLs
						category: item.category,
						subCategory: item.subCategory,
						review: item.review,
						sizes: item.sizes,
						data: item.data,
						bestseller: item.bestseller,
					};
				});

				res.status(200).json({ result: bestSellerswith_image });
			}

			// res.status(200).json({ result: bestSellers });
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
export const ProductPrice = async (req, res) => {
	var totalItems = 0;
	try {
		const orderIdies = req.body["result"];
		console.log("Received Order IDs:", orderIdies);

		const items = await Promise.all(
			orderIdies.map(async ({ itemId, totalQuantity }) => {
				const item = await ItemModule.findById(itemId);
				if (!item) {
					console.error(`Item with ID ${itemId} not found`);
					return null;
				}
				console.log(`Item Price for ${itemId}:`, item.price);
				totalItems = totalItems + totalQuantity;
				return item.price * totalQuantity; // Multiply by quantity
			})
		);
		console.log("item in ", totalItems);
		// Filter out null values (items not found)
		const validPrices = items.filter((price) => price !== null);

		// Calculate total price
		const total = validPrices.reduce((sum, price) => sum + price, 0);
		console.log("Total Price:", total);

		if (validPrices.length === 0) {
			return res
				.status(404)
				.json({ success: false, message: "No items found" });
		}

		res.json({ success: true, total, totalItems });
	} catch (error) {
		console.error("Error fetching item price:", error);
		res.status(500).json({ success: false, message: "Internal Server Error" });
	}
};
