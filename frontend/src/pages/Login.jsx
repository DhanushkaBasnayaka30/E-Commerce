import { useState } from "react";
import { MdOutlineLocalPhone } from "react-icons/md";
import { RiLock2Fill } from "react-icons/ri";
import { Link } from "react-router-dom";

function Login() {
	const [isLogin, setISlogin] = useState(true);
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
		
		// Create a copy of the current error state
		let newError = { ...error };
		
		// Update the data state
		setData((prevData) => ({
			...prevData,
			[name]: value,
		}));

		// Real-time validation
		const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;

		if (name === "mobile") {
			if (value && (!/^[0-9]*$/.test(value) || value.length > 10)) {
				newError.mobile_error = "Invalid phone number. Only digits are allowed and max 10 digits.";
			} else if (value.length !== 10 && value.length > 0) {
				newError.mobile_error = "Phone number must be exactly 10 digits.";
			} else {
				newError.mobile_error = ""; // Clear error if valid
			}
		} else if (name === "password") {
			if (!regex.test(value)) {
				newError.password_error = "Password must contain uppercase, lowercase, digit, and special character.";
			} else if (value.length < 6) {
				newError.password_error = "Password must be at least 6 characters.";
			} else {
				newError.password_error = ""; // Clear error if valid
			}
		}
		
		// Update the error state
		setError(newError);
	};
	
	const handleSubmit = (e) => {
		const length1 =error.mobile_error.length;
		const length2 =error.password_error.length;
	
		console.log(length1,length2);
		
		e.preventDefault();
		if(length1===0 && length2===0)
			{
		
		// Basic validation
		if (!data.mobile || !data.password) {
			setError("Please fill in all fields");
			return;
		}
		if (!/^[0-9]{10}$/.test(data.mobile)) {
			setError("Invalid phone number. It should be 10 digits.");
			return;
		}
		
		// Clear error and log the data (replace this with your login logic)
		setError("");
		console.log("Login Data:", data);

		}
	};

	return (
		<>
			{/* Login Container */}
			<div className="h-screen w-full flex">
				<div className="w-full h-screen flex items-center justify-center bg-gray-100">
					<div
						className={`w-[90%] sm:w-[70%] md:w-[50%] lg:w-[30%] xl:w-[35%] h-[60%] sm:h-[50%] bg-white shadow-lg shadow-gray-400 flex flex-col rounded-xl relative z-10 ${
							isLogin ? "flex" : "hidden"
						}`}
						>
						{/* Title */}
						<div className="w-full flex justify-center mt-4">
							<span className="text-3xl font-bold">LOGIN</span>
						</div>

						{/* Login Form */}
						<div className="mt-8 w-full h-full flex items-center justify-center">
							<form className="w-[80%] mx-auto flex flex-col gap-y-2" onSubmit={handleSubmit}>
								{/* Phone Number Field */}
								<div className="flex items-center gap-x-3 flex-col">
									<div className="w-full h-12 items-center justify-center text-xl flex gap-x-2">
										<div className="w-12 flex h-12 justify-center items-center text-xl border border-gray-200 rounded">
											<MdOutlineLocalPhone />
										</div>
										<input
											name="mobile"
											type="text"
											placeholder="07xxxxxxxxx"
											className="flex-1 bg-gray-200 h-12 pl-3 text-base outline-none rounded focus:ring-2 focus:ring-blue-500"
											onChange={handleChange}
										/>
									</div>
									<div className="w-[100%] flex justify-end h-12">
										{error.mobile_error && (
											<p className="text-red-500 text-sm mt-1 w-[90%] pl-4 pt-1 text-start justify-start flex">
												{error.mobile_error}
											</p>
										)}
									</div>
								</div>

								{/* Password Field */}
								<div className="flex items-center gap-x-3 flex-col">
									<div className="w-full h-12 flex items-center justify-center text-xl border border-gray-200 rounded gap-x-2">
										<div className="w-12 flex h-12 justify-center items-center text-xl border border-gray-200 rounded">
											<RiLock2Fill />
										</div>
										<input
											name="password"
											type="password"
											placeholder="Your Password"
											className="flex-1 bg-gray-200 h-12 pl-3 text-base outline-none rounded focus:ring-2 focus:ring-blue-500"
											onChange={handleChange}
										/>
									</div>
									<div className="w-[100%] flex justify-end h-12">
										{error.password_error && (
											<p className="text-red-500 text-sm mt-1 w-[90%] pl-4 text-start justify-start flex">
												{error.password_error}
											</p>
										)}
									</div>
								</div>

								{/* Login Button */}
								<div className="w-full">
									<button
										type="submit"
										className="w-full text-xl text-white h-12 bg-orange-500 rounded hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-400 capitalize"
									>
										Login
									</button>
								</div>

								{/* Register Link */}
								<div className="w-full text-center mt-2">
									<p>
										Don't have an account?{" "}
										<Link to="/registation">
											<span className="text-blue-800 underline cursor-pointer hover:text-blue-600">
												Register now
											</span>
										</Link>
									</p>
								</div>
							</form>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}

export default Login;
