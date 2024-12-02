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
					const imagename = imgPath.split("/").pop();
					// Find the matching public URL
					const matchingUrl = publicUrls.find((img) =>
						img.url.includes(imagename)
					);
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

						const matchingUrl = publicUrls.find((img) =>
							img.url.includes(imagename)
						);
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
