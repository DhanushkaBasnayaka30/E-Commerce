import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import ProductItems from './ProductItems';

function RleatedProduct({category,subCategory}) {

  const {products}= useContext(ShopContext);
  const [related,setRelated] = useState([])

  useEffect(()=>{
    if(products.length>0){
      let productCopy = products.slice()
      productCopy = productCopy.filter((item)=>category===item.category);
      productCopy = productCopy.filter((item)=>subCategory===item.subCategory);
      console.log(productCopy.slice(0,5))
      setRelated(productCopy.slice(0,5))
    }
  },[products])
  return (
    <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6'>
      {related.map((item,index)=>(
        <div key={index} className='w-full '>
          <ProductItems name={item.name} id={item._id} price={item.price} image={item.image}/>
        </div>
      ))}
    </div>
  )
}

export default RleatedProduct
