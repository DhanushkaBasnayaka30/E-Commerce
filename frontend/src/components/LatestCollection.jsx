import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import Title from './Title';
import ProductItems from './ProductItems';
import axios from "axios";
function LatestCollection() {
  const { products } = useContext(ShopContext);
  const [latestCollection, setLatestCollection] = useState([]);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://ec2-18-163-68-87.ap-east-1.compute.amazonaws.com/api/api/get-items", { withCredentials: true });
        console.log(response);
        if (response && response.data) {
          console.log(response.data.result.slice(0, 10));
          setLatestCollection(response.data.result.slice(0, 10));
          // setProductItems(response.data.result);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);
  return (
    <div className="my-10">
      <div className="text-center py-8 text-3xl sm:mt-24" data-aos="zoom-in">
        <Title text1="LATEST" text2="COLLECTION" />
        <p className="w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eveniet mollitia minima consectetur possimus autem officia aliquam alias incidunt assumenda obcaecati esse, repellendus labore debitis facilis atque doloribus perspiciatis laborum excepturi.
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6 sm:mt-12" data-aos="fade-up">
        {latestCollection.map((item) => (
          <div key={item._id}  >
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
