import {
	createBrowserRouter,
	RouterProvider,
}from "react-router-dom";

import { Provider } from "react-redux";
import { store } from "../../frontend/src/Redux/store/store.js";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import Orders from "./pages/Orders";
import Cart from "./pages/Cart";
import PlaceOrder from "./pages/PlaceOrder";
import Collection from "./pages/Collection";
import Product from "./pages/Product";
import "react-toastify/dist/ReactToastify.css";
import "aos/dist/aos.css";
import Dashboard from "../src/assets/Admin/pages/Dashboard";
import UserLayout from "./Layout/UserLayout";
import AdminLayout from "./Layout/AdminLayout";
import Products from "./assets/Admin/pages/Products";
import Registtion from "./pages/Registtion";

const router = createBrowserRouter([
	{
		path: "/",
		element: <UserLayout />,
		children: [
			{ path: "", element: <Home /> },
			{ path: "about", element: <About /> },
			{ path: "contact", element: <Contact /> },
			
			{ path: "orders", element: <Orders /> },
			{ path: "cart", element: <Cart /> },
			{ path: "place-order", element: <PlaceOrder /> },
			{ path: "collection", element: <Collection /> },
			{ path: "product/:id", element: <Product /> },
			
		],
	},
	{ path: "/login", element: <Login /> },
	{ path: "/registation", element: <Registtion /> },
	{
		path: "/admin",
		element: <AdminLayout />,
		children: [
			{ path: "dashboard", element: <Dashboard /> },
			{ path: "products", element: <Products /> }
		],
	},
]);

function App() {
	return (
		<Provider store={store}>
			<RouterProvider router={router} />
		</Provider>
	);
}

export default App;
