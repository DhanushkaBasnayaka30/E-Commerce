import React, { useContext, useEffect, useState } from 'react';
import SearchBar from '../components/SearchBar';
import Footer from '../components/Footer';
import Navbar from "../components/Navbar"
import { ToastContainer } from 'react-toastify';
import { Player } from '@lottiefiles/react-lottie-player';
import loaders from '../assets/loaders.json';
import { ShopContext } from '../context/ShopContext';
import 'react-toastify/dist/ReactToastify.css';
import 'aos/dist/aos.css';
import Aos from 'aos';
import { Outlet } from 'react-router-dom';

function UserLayout() {
  const { showSearch, visible } = useContext(ShopContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Aos.init({ duration: 2000 });
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Player autoplay loop src={loaders} style={{ height: '300px', width: '300px' }} />
      </div>
    );
  }

  return (
    <>
      <ToastContainer />
      <div className="w-full sm:w-[90%] mx-auto">
        <Navbar />
        <div
          className={`w-[90%] mx-auto ease-in-out top-20 z-10 sm:fixed relative transition duration-500 ${
            showSearch && visible ? 'translate-y-0' : '-translate-y-full'
          }`}
        >
          <SearchBar />
        </div>
        <div>
          <Outlet/>
        </div>
        <Footer />
      </div>
    </>
  );
}

export default UserLayout;
