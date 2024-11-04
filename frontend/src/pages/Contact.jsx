import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useState } from "react";

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
      <form onSubmit={(e) => e.preventDefault()} className="bg-red-300 mt-12">
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
    </div>
  );
}

export default Contact;
