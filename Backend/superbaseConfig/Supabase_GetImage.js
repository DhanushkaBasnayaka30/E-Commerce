// supabaseStorage.js
import { createClient } from "@supabase/supabase-js";

// Initialize Supabase Client
// const supabaseUrl = process.env.SupabaseUrl;
// const supabaseKey = process.env.SupabaseKey;

const supabase = createClient(supabaseUrl, supabaseKey);

/**
 * Fetches a list of files from a specified folder in Supabase storage
 * and returns them with their public URLs.
 *
 * @param {string} bucketName - The name of the Supabase storage bucket.
 * @param {string} folderPath - The path to the folder within the bucket.
 * @param {number} limit - The maximum number of files to fetch.
 * @param {number} offset - The offset for pagination.
 * @returns {Promise<Array>} - A promise that resolves to an array of image objects with URLs.
 */
/**
 * Fetches a list of files from a specified folder in Supabase storage
 * and returns them with their public URLs.
 *
 * @param {string} bucketName - The name of the Supabase storage bucket.
 * @param {string} folderPath - The path to the folder within the bucket.
 * @param {number} limit - The maximum number of files to fetch.
 * @param {number} offset - The offset for pagination.
 * @returns {Promise<Array>} - A promise that resolves to an array of image objects with URLs.
 */
export const getImagesWithUrls = async (
	bucketName,
	folderPath = "",
	limit = 100,
	offset = 0
) => {
	try {
		if (typeof folderPath !== "string") {
			console.error("Error: folderPath must be a string");
			return [];
		}

		const { data, error } = await supabase.storage
			.from(bucketName)
			.list(folderPath, {
				limit,
				offset,
				sortBy: { column: "name", order: "asc" },
			});

		if (error) {
			console.error("Error fetching files from Supabase:", error);
			return [];
		}
		// console.log(
		// 	supabase.storage
		// 		.from("itemImage")
		// 		.getPublicUrl("item/adf-2024_05_18_09_58_IMG_0167.JPG")
		// );

		const imagesWithUrls = data.map((image) => {
			// Log the variables here
			const imagePath = `https://tutjsnlbzyrnobycqicd.supabase.co/storage/v1/object/public/itemImage/${folderPath}/${image.name}`;

			const { publicUrl } = supabase.storage
				.from(bucketName)
				.getPublicUrl(`${folderPath}/${image.name}`);

			//  console.log(imagePath);

			return {
				
				url: imagePath,
			};
		});

	
		return imagesWithUrls;
	} catch (err) {
		console.error("Unexpected error:", err);
		return [];
	}
};
