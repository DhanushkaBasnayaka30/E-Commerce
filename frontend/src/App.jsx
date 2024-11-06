import {
	createBrowserRouter,
	RouterProvider,
} from "react-router-dom";
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

const router = createBrowserRouter([
	{
		path: "/",
		element: <UserLayout />,
		children: [
			{ path: "", element: <Home /> },
			{ path: "about", element: <About /> },
			{ path: "contact", element: <Contact /> },
			{ path: "login", element: <Login /> },
			{ path: "orders", element: <Orders /> },
			{ path: "cart", element: <Cart /> },
			{ path: "place-order", element: <PlaceOrder /> },
			{ path: "collection", element: <Collection /> },
			{ path: "product/:id", element: <Product /> },
			
		],
	},
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
	return <RouterProvider router={router} />;
}

export default App;
