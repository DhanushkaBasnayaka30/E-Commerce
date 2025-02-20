import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import ProductItems from './ProductItems';
import axios from 'axios';

function RleatedProduct({ category, subCategory }) {

  // const {products}= useContext(ShopContext);
  const [products, setProducts] = useState([]);
  const [related, setRelated] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://ec2-18-163-68-87.ap-east-1.compute.amazonaws.com/api/api/get-items");
        if (response && response.data) {
          setProducts(response.data.result);

        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (products.length > 0) {
      let productCopy = products.slice()
      productCopy = productCopy.filter((item) => category === item.category);
      productCopy = productCopy.filter((item) => subCategory === item.subCategory);

      setRelated(productCopy.slice(0, 5))
    }
  }, [products])
  return (
    <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6'>
      {related.map((item, index) => (
        <div key={index} className='w-full '>
          <ProductItems name={item.name} id={item._id} price={item.price} image={item.image} />
        </div>
      ))}
    </div>
  )
}

export default RleatedProduct
