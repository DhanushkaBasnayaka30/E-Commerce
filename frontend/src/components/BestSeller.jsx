import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'

import Title from './Title';
import ProductItems from './ProductItems';
import axios from 'axios';

function BestSeller() {
  const {products} =useContext(ShopContext);
const [bestSeller,setbestSeller] = useState([])

useEffect(() => {
  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:8090/api/best-seller");
      if (response && response.data) {
     
        setbestSeller(response.data.result);
        // setProductItems(response.data.result);
      }
    } catch (error) {
      console.log(error);
    }
  };
  fetchData();
}, []);



  return (
    <div className='my-10'>
      <div className='text-center text-3xl py-8 flex flex-col items-center justify-center sm:mt-16' >
        <Title text1='BEST' text2="SELLER"/>
        <p className='w-3/4 m-auro text-xs sm:text-sm md:text-base text-gray-600' >
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui et ad sequi vero. Officiis aut alias unde? Omnis velit voluptatibus eligendi, dolorum, blanditiis, asperiores doloribus rerum nam beatae modi non?
        </p>
      </div>
      <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-x-2 sm:mt-12' >
        {bestSeller.map((item,index)=>(
          <ProductItems id={item._id} name={item.name} image={item.image} price={item.price} key={index}/>
        ))}
      </div>
    </div>
  )
}

export default BestSeller
