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
import "./App.css";
import Footer from "./components/Footer";
import SearchBar from "./components/SearchBar";
import { useContext } from "react";
import { ShopContext } from "./context/ShopContext";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
	const { search, setSearch, showSearch, setShowSearch, visible } =
		useContext(ShopContext);
	

	return (
		<>
			<ToastContainer />
			<div className="w-full   sm:w-[80%] mx-auto ">
				{/* Navbar outside the Routes */}
				<div className="w-full top-0">
					<Navbar />
				</div>
				<div
					className={` w-[80%] mx-auto ease-in-out  top-20 z-10 sm:fixed relative transition duration-500  ${
						showSearch && visible ? "translate-y-0" : "-translate-y-full"
					}`}>
					<SearchBar />
				</div>
				{/* Routes definition */}
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
				</Routes>

				<div className="w-full relative bottom-0  mx-auto">
					<Footer />
				</div>
			</div>
		</>
	);
}

export default App;
