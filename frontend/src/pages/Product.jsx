import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";

function Product() {

  
  const { id } = useParams(); // productID is a string
  const { products } = useContext(ShopContext);
  const [productData, setProductData] = useState("");
  const [image, setImage] = useState("");
console.log(productData);
  // Fetch product data by ID
  console.log("adsfadsfadsfadsfdsfasd");
  useEffect(() => {
    const product = products.find((item) => item.id === id);
    console.log(id);
    console.log("og",product);
    if (product) {
      setProductData(productData);
      setImage(product.image[0]);
    }
  }, [id, products]);

  useEffect(()=>{
    console.log(products);
  },[])
  return productData ? (
    <div className="border-t pt-10 transition-opacity ease-in duration-500 opacity-100">
      {/* product Data */}
      <div className="flex gap-12 sm:gap-12 flex-col sm:flex-row ">
        {/* product image */}
        <div
          className="flex flex-col overflow-y-scroll overflow-x-auto justify-between sm:justify-normal sm:w-[18.7%] w-full">
          {productData.image.map((item, index) => (
            <img
              key={index}
              className="w-[24%] sm:mb-3 flex-shrink-0 cursor-pointer"
              src={item}
              alt=""
              onClick={() => setImage(item)} // Allows clicking to switch the main image
            />
          ))}
        </div>
        {/* Display the selected main image */}
        <div>
          <img src={image} alt={productData.name} />
        </div>
      </div>
    </div>
  ) : (
    <div className="opacity-0">Loading...</div>
  );
}

export default Product;
