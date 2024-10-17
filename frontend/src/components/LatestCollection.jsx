import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import Title from './Title';
import ProductItems from './ProductItems';

function LatestCollection() {
  const { products } = useContext(ShopContext);
  const [latestCollection, setLatestCollection] = useState([]);

  useEffect(() => {
    console.log(products);  // Ensure products is an array
    if (Array.isArray(products)) {
      setLatestCollection(products.slice(0, 10));  // Slicing first 3 products
    } else {
      console.error("Products is not an array:", products);
    }
  }, [products]);

  return (
    <div className="my-10">
      <div className="text-center py-8 text-3xl">
        <Title text1="LATEST" text2="COLLECTION" />
        <p className="w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eveniet mollitia minima consectetur possimus autem officia aliquam alias incidunt assumenda obcaecati esse, repellendus labore debitis facilis atque doloribus perspiciatis laborum excepturi.
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6">
        {latestCollection.map((item) => (
          <div key={item._id}>
            <ProductItems
              id={item._id}
              name={item.name}
              price={item.price}
              image={item.image}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default LatestCollection;
