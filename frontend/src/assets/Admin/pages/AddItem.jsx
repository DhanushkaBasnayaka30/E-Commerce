import axios from 'axios';
import React, { useState } from 'react';

function AddItem() {
  const [images, setImages] = useState([]);
  const [name, setName] = useState('');
  const [id, setId] = useState('');
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');
  const [subCategory, setSubCategory] = useState('');
  const [bestSeller, setBestSeller] = useState(false);

  const handleImageChange = (e) => {
    setImages(Array.from(e.target.files).slice(0, 4));
  };

  const handleSizeChange = (size) => {
    setSelectedSizes((prevSizes) =>
      prevSizes.includes(size)
        ? prevSizes.filter((s) => s !== size)
        : [...prevSizes, size]
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const formData = new FormData();
    formData.append('_id', id);
    formData.append('name', name);
    formData.append('description', description);
    formData.append('price', price);
    formData.append('category', category);
    formData.append('subCategory', subCategory);
    formData.append('sizes', selectedSizes); // Ensure selectedSizes is a string if needed
    formData.append('bestseller', bestSeller); // If needed
  
    // Append multiple images
    images.forEach((image) => {
      formData.append('images', image); 
    });
  
    try {
      const response = await axios.post("http://localhost:8090/api/add-item", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      
      if (response) {
        console.log('Response:', response.data);
      }
    } catch (error) {
      console.error('Error during submission:', error.response ? error.response.data : error.message);
      // Handle error UI feedback here
    }
  };
  

  return (
    <div className="p-6 max-w-2xl mx-auto bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-semibold mb-6">Add New Item</h2>
      
      <form onSubmit={handleSubmit}>
        
        {/* Image Upload */}
        <label className="block mb-2 text-gray-700 font-medium">Upload Images (up to 4)</label>
        <input
          type="file"
          multiple
          accept="image/*"
          onChange={handleImageChange}
          className="mb-4 p-2 border rounded w-full"
        />
        
        {/* Preview Images */}
        <div className="grid grid-cols-2 gap-2 mb-4">
          {images.map((img, index) => (
            <div key={index} className="w-full h-32 bg-gray-100 flex items-center justify-center overflow-hidden border rounded">
              <img src={URL.createObjectURL(img)} alt={`preview-${index}`} className="object-cover h-full w-full" />
            </div>
          ))}
        </div>

        {/* Name */}
        <label className="block mb-2 text-gray-700 font-medium">Item id</label>
        <input
          type="text"
          value={id}
          onChange={(e) => setId(e.target.value)}
          className="mb-4 p-2 border rounded w-full"
          placeholder="Enter item ID"
        />
        <label className="block mb-2 text-gray-700 font-medium">Item Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="mb-4 p-2 border rounded w-full"
          placeholder="Enter item name"
        />

        {/* Sizes */}
        <label className="block mb-2 text-gray-700 font-medium">Sizes</label>
        <div className="flex space-x-4 mb-4">
          {['S', 'M', 'L','XL','2XL'].map((size) => (
            <label key={size} className="flex items-center">
              <input
                type="checkbox"
                checked={selectedSizes.includes(size)}
                onChange={() => handleSizeChange(size)}
                className="mr-1"
              />
              {size}
            </label>
          ))}
        </div>

        {/* Description */}
        <label className="block mb-2 text-gray-700 font-medium">Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="mb-4 p-2 border rounded w-full"
          placeholder="Enter item description"
        />

        {/* Price */}
        <label className="block mb-2 text-gray-700 font-medium">Price ($)</label>
        <input
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="mb-4 p-2 border rounded w-full"
          placeholder="Enter price"
        />

        {/* Category */}
        <label className="block mb-2 text-gray-700 font-medium">Category</label>
        <input
          type="text"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="mb-4 p-2 border rounded w-full"
          placeholder="Enter category"
        />

        {/* Subcategory */}
        <label className="block mb-2 text-gray-700 font-medium">Subcategory</label>
        <input
          type="text"
          value={subCategory}
          onChange={(e) => setSubCategory(e.target.value)}
          className="mb-4 p-2 border rounded w-full"
          placeholder="Enter subcategory"
        />

        {/* Bestseller */}
        <label className="flex items-center mb-4">
          <input
            type="checkbox"
            checked={bestSeller}
            onChange={() => setBestSeller(!bestSeller)}
            className="mr-2"
          />
          <span className="text-gray-700 font-medium">Bestseller</span>
        </label>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded mt-4 hover:bg-blue-600">
          Submit
        </button>
      </form>
    </div>
  );
}

export default AddItem;
