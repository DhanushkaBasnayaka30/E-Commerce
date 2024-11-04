import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import Orders from "./pages/Orders";
import Cart from "./pages/Cart";
import PlaceOrder from "./pages/PlaceOrder";
import Collection from "./pages/Collection";
import Product from "./pages/Product";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import SearchBar from "./components/SearchBar";
import { useContext, useEffect, useState } from "react";
import { ShopContext } from "./context/ShopContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AOS from "aos";
import "aos/dist/aos.css";
import { Player } from "@lottiefiles/react-lottie-player"; // For rendering loaders.json if it's a Lottie animation
import loaders from "./assets/loaders.json";
import Dashboard from "./assets/Admin/Dashboard";

function App() {
	const { showSearch, visible } = useContext(ShopContext);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		AOS.init({ duration: 2000 });
	}, []);

	useEffect(() => {
		setLoading(true);
		const timer = setTimeout(() => {
			setLoading(false);
		}, 2000);
		return () => clearTimeout(timer);
	}, []);
	

	return loading ? (
		<div className="flex items-center justify-center h-screen">
			<Player autoplay loop src={loaders} style={{ height: "300px", width: "300px" }} />
		</div>
	) : (
		<>
			<ToastContainer />
			<div className="w-full sm:w-[90%] mx-auto">
				<Navbar />
				<div
					className={`w-[90%] mx-auto ease-in-out top-20 z-10 sm:fixed relative transition duration-500 ${
						showSearch && visible ? "translate-y-0" : "-translate-y-full"
					}`}>
					<SearchBar />
				</div>
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/about" element={<About />} />
					<Route path="/contact" element={<Contact />} />
					<Route path="/login" element={<Login />} />
					<Route path="/orders" element={<Orders />} />
					<Route path="/cart" element={<Cart />} />
					<Route path="/place-order" element={<PlaceOrder />} />
					<Route path="/collection" element={<Collection />} />
					<Route path="/product/:id" element={<Product />} />
					<Route path="/admin" element={<Dashboard />} />
				</Routes>
				<Footer />
			</div>
		</>
	);
}

export default App;
