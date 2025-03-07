import axios from "axios";
import { useContext, useState } from "react";
import { MdOutlineLocalPhone } from "react-icons/md";
import { RiLock2Fill } from "react-icons/ri";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { setLoginValue } from "../Redux/Slices/UserSlice";


function Login() {
	const APP_URL = import.meta.env.VITE_APP_URL;

	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [data, setData] = useState({
		mobile: "",
		password: "",
	});
	
	const [error, setError] = useState({
		mobile_error: "",
		password_error: "",
	});

	const handleChange = (e) => {
		const { name, value } = e.target;
		let newError = { ...error };

		setData((prevData) => ({
			...prevData,
			[name]: value,
		}));

		// Real-time validation
		const regex =
			/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;

		if (name === "mobile") {
			if (value && (!/^[0-9]*$/.test(value) || value.length > 10)) {
				newError.mobile_error =
					"Invalid phone number. Only digits allowed, max 10 digits.";
			} else if (value.length !== 10 && value.length > 0) {
				newError.mobile_error = "Phone number must be exactly 10 digits.";
			} else {
				newError.mobile_error = "";
			}
		} else if (name === "password") {
			if (!regex.test(value)) {
				newError.password_error =
					"Password must contain uppercase, lowercase, digit, and special character.";
			} else if (value.length < 6) {
				newError.password_error = "Password must be at least 6 characters.";
			} else {
				newError.password_error = "";
			}
		}
		setError(newError);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		// Check for client-side validation errors
		if (error.mobile_error || error.password_error) {
			alert("Please fix the errors in the form.");
			return;
		}

		if (!data.mobile || !data.password) {
			alert("Please fill in all fields.");
			return;
		}

		// Prepare request data
		const req_data = {
			mobile: data.mobile,
			password: data.password,
		};

		try {
			// Make API request
			const response = await axios.post(`${APP_URL}user/login`, req_data, { withCredentials: true });

			console.log(response.data.token);


			// Handle successful login
			if (response.data.Login) {
				dispatch(
					setLoginValue({
						name: response.data.name,
						mobile: response.data.mobile,
						token: true,
					})
				);
				navigate("/"); // Redirect to the home page
			} else {
				// Handle unexpected server response
				alert("Login failed. Please try again.");
			}
		} catch (error) {
			// Handle errors
			if (error.response) {
				// Server-side error (e.g., invalid credentials)
				alert(error.response.data.messagge || "Login failed. Please check your credentials.");
			} else if (error.request) {
				// Network or connection error
				alert("Unable to connect to the server. Please try again later.");
			} else {
				// Other errors (e.g., unexpected issues)
				alert("An error occurred. Please try again.");
			}
		}
	};
	return (
		<div className="h-screen flex items-center justify-center bg-gray-100">
			<div className="w-full max-w-md bg-white shadow-md rounded-lg p-8">
				<h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
					LOGIN
				</h2>
				<form onSubmit={handleSubmit} className="space-y-5">
					{/* Phone Number Field */}
					<div className="space-y-1">
						<label className="flex items-center bg-gray-200 p-3 rounded">
							<MdOutlineLocalPhone className="text-xl text-gray-500 mr-2" />
							<input
								name="mobile"
								type="text"
								placeholder="07xxxxxxxxx"
								className="w-full bg-gray-200 focus:outline-none"
								onChange={handleChange}
							/>
						</label>
						{error.mobile_error && (
							<p className="text-red-500 text-sm">{error.mobile_error}</p>
						)}
					</div>

					{/* Password Field */}
					<div className="space-y-1">
						<label className="flex items-center bg-gray-200 p-3 rounded">
							<RiLock2Fill className="text-xl text-gray-500 mr-2" />
							<input
								name="password"
								type="password"
								placeholder="Your Password"
								className="w-full bg-gray-200 focus:outline-none"
								onChange={handleChange}
							/>
						</label>
						{error.password_error && (
							<p className="text-red-500 text-sm">{error.password_error}</p>
						)}
					</div>

					{/* Login Button */}
					<button
						type="submit"
						className="w-full py-3 bg-orange-500 text-white font-bold rounded hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-400 transition-all">
						LOGIN
					</button>

					{/* Register Link */}
					<div className="text-center mt-4">
						<p className="text-gray-700">
							Don't have an account?{" "}
							<Link to="/registation" className="text-blue-600 underline">
								Register here
							</Link>
						</p>
					</div>
				</form>
			</div>
		</div>
	);
}

export default Login;
