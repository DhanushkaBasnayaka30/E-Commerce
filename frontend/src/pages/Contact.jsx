import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useState } from "react";
import Title from "../components/Title";
import { assets, productImages } from "../assets/assets";
import NewsLatter from "../components/NewsLatter";

function Contact() {
	const supabase = useSupabaseClient();
	const [file, setFile] = useState(null); // State to store the selected file

	const handleFileChange = (e) => {
		const selectedFile = e.target.files[0];
		if (selectedFile) {
			setFile(selectedFile);
		}
	};

	const uploadImage = async () => {
		if (!file) {
			alert("Please select a file first.");
			return;
		}

		try {
			const { data, error } = await supabase.storage
				.from("itemImage") // Ensure this bucket exists in your Supabase project
				.upload(`item/${file.name}`, file); // Using "images/" folder for uploaded files

			if (error) throw error;

			alert("Successfully uploaded");
		} catch (error) {
			alert("Error uploading image: " + error.message);
		}
	};

	return (
		<div className="px-2">
			<form
				onSubmit={(e) => e.preventDefault()}
				className="bg-red-300 mt-12 hidden">
				<label htmlFor="image" className="block text-gray-700 font-medium mb-2">
					Upload Image
				</label>
				<input
					name="image"
					id="image"
					type="file"
					accept="image/*"
					className="mb-4"
					onChange={handleFileChange} // Attach the file change handler
				/>
				<button
					type="button" // Change button type to "button" to avoid form submission
					className="bg-red-500 py-2 px-8 rounded text-white"
					onClick={uploadImage} // Directly call uploadImage function
				>
					UPLOAD
				</button>
			</form>

			<div className=" xl:w-[50%] xl:mx-auto w-full h-auto mt-24 sm:p-5 md:p-1 p-3  flex flex-col gap-y-2">
				{/* header */}
				<div className="w-full  flex justify-center">
					<h1 className="w-full   text-2xl sm:text-xl md:text-3xl  text-center flex items-center justify-center ">
						<Title text1={"CONTACT"} text2={"US"} />
					</h1>
				</div>
				{/* main part */}
				<div className=" md:flex-row flex flex-col gap-2 md:h-auto h-[900px] md:mt-8">
					{/* image */}
					<div className=" w-full md:w-3/5 sm:h-[550px] md:h-[500px] h-1/2 md:mt-0 mt-4">
						<img src={assets.contact_img} alt="" className= "w-full h-full bg-cover bg-center" />
					</div>
					{/* text */}
					<div className=" w-full md:w-2/5 md:h-[500px] flex flex-col justify-around text-gray-500 text-sm h-auto md:px-5 ">
						{/* sectrion1 */}
						<div className="md:mt-0 mt-8">
							<h1 className="text-xl font-semibold text-gray-600">Our Store</h1>
							<p className="mt-5">54709 Willms Station</p>
							<p>Suite 350, Washington, USA</p>
							<p className="mt-5">Tel: (415) 555-0132</p>
							<p>Email: admin@forever.com</p>
						</div>
						{/* section2 */}
						<div className="mt-5">
              <h1 className="text-xl font-semibold text-gray-600">Careers at Forever</h1>
              <p className="mt-5">Learn model about our teams and job openings</p>
            </div>
            {/* explore button */}
            <div className="w-full h-20  flex items-center mt-4 ">
              <p className="text-black border border-black px-6 py-4 hover:border-none hover:bg-black hover:text-white cursor-pointer ">Explore Jobs</p>
            </div>
            {/* explore button */}
					</div>
				</div>
        <div className="w-full xl:mt-28 h-auto md:mt-16 mt-8">
					<NewsLatter />
				</div>
			</div>
		</div>
	);
}

export default Contact;
