import { useState } from "react";
import { IoPerson } from "react-icons/io5";
import { MdOutlineLocalPhone } from "react-icons/md";
import { RiLock2Fill } from "react-icons/ri";
import { GiConfirmed } from "react-icons/gi";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

function Registration() {
	const navigate = useNavigate();
	const [data, setData] = useState({
		name: "",
		mobile: "",
		password: "",
		con_password: "",
	});
	const [error, setError] = useState({
		name_error: "",
		mobile_error: "",
		password_error: "",
		con_password_error: "",
		global_error: "",
	});

	const handleChange = (e) => {
		const { name, value } = e.target;
		let newError = { ...error };

		// Update the data state
		setData((prevData) => ({
			...prevData,
			[name]: value,
		}));

		// Real-time validation
		const regex =
			/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;

		if (name === "name") {
			newError.name_error = value.trim() === "" ? "Name cannot be empty." : "";
		} else if (name === "mobile") {
			if (value && (!/^[0-9]*$/.test(value) || value.length > 10)) {
				newError.mobile_error =
					"Invalid phone number. Only digits are allowed and max 10 digits.";
			} else if (value.length !== 10 && value.length > 0) {
				newError.mobile_error = "Phone number must be exactly 10 digits.";
			} else {
				newError.mobile_error = "";
			}
		} else if (name === "password") {
			newError.password_error = !regex.test(value)
				? "Password must contain uppercase, lowercase, digit, and special character."
				: "";
			// Check if passwords match
			newError.con_password_error =
				data.con_password && value !== data.con_password
					? "Passwords do not match."
					: "";
		} else if (name === "con_password") {
			newError.con_password_error =
				value !== data.password ? "Passwords do not match." : "";
		}

		// Update the error state
		setError(newError);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		// Check if there are any errors
		if (Object.values(error).some((errMsg) => errMsg.length > 0)) {
			setError({
				...error,
				global_error: "Please resolve all errors before submitting.",
			});
			return;
		}

		// Check for empty fields
		if (!data.name || !data.mobile || !data.password || !data.con_password) {
			setError({ ...error, global_error: "Please fill in all fields" });
			return;
		}

		// All validations passed
		console.log(data);
		try {
			const response = await axios.post(
				"http://localhost:8090/api/user/registration",
				data
			);
			

			if (response.status >= 200 && response.status < 300) {
				navigate("/login");
				console.log("User registered successfully:", response.data);
			} else {
				console.error("Unexpected response status:", response.status);
			}
		} catch (error) {
			if (axios.isAxiosError(error)) {
				if (error.response) {
					console.error("Server Error:", error.response.status);
					console.error(
						"Error Message:",
						error.response.data.message || error.response.statusText
					);

					if (error.response.status === 409) {
						setData({
							name: "",
							mobile: "",
							password: "",
							con_password: "",
						});
						toast.error("This mobile number is already registered.");
						console.error("This user already exists.");
					} else if (error.response.status === 400) {
						console.error("Bad Request: Please check the input data.");
					} else if (error.response.status === 500) {
						console.error("Internal Server Error: Please try again later.");
					}
				} else if (error.request) {
					console.error("No response received from server:", error.request);
				} else {
					console.error("Error in Axios request:", error.message);
				}
			} else {
				console.error("Unexpected Error:", error);
			}
		}

		setError({});
		console.log("Registration Data:", data);
	};

	return (
		<>
			<div className="h-screen w-full flex">
				<div className="w-full h-screen flex items-center justify-center bg-gray-100">
					<div className="w-[90%] sm:w-[70%] md:w-[50%] lg:w-[30%] xl:w-[35%] h-auto bg-white shadow-lg shadow-gray-400 flex flex-col rounded-xl pb-6">
						<div className="w-full flex justify-center mt-4">
							<span className="text-3xl font-bold">REGISTRATION</span>
						</div>
						<div className="mt-8 w-full flex items-center justify-center">
							<form
								className="w-[80%] mx-auto flex flex-col gap-y-5"
								onSubmit={handleSubmit}>
								<InputField
									name="name"
									type="text"
									placeholder="John Doe"
									icon={<IoPerson />}
									error={error.name_error}
									onChange={handleChange}
								/>
								<InputField
									name="mobile"
									type="text"
									placeholder="07xxxxxxxx"
									icon={<MdOutlineLocalPhone />}
									error={error.mobile_error}
									onChange={handleChange}
								/>
								<InputField
									name="password"
									type="password"
									placeholder="Your Password"
									icon={<RiLock2Fill />}
									error={error.password_error}
									onChange={handleChange}
								/>
								<InputField
									name="con_password"
									type="password"
									placeholder="Re-enter Password"
									icon={<GiConfirmed />}
									error={error.con_password_error}
									onChange={handleChange}
								/>

								{/* Register Button */}
								<button
									type="submit"
									className="w-full text-xl text-white h-12 bg-orange-500 rounded hover:bg-orange-600">
									REGISTER
								</button>
								<div className="text-center mt-2">
									Already have an account?{" "}
									<Link to="/login">
										<span className="text-blue-800 underline">Login here</span>
									</Link>
								</div>
								{error.global_error && (
									<div className="text-red-500 text-center mt-2">
										{error.global_error}
									</div>
								)}
							</form>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}

const InputField = ({ name, type, placeholder, icon, error, onChange }) => (
	<div className="flex flex-col gap-y-1">
		<div className="flex items-center gap-x-2 bg-gray-200 h-12 rounded">
			<div className="text-xl p-2">{icon}</div>
			<input
				name={name}
				type={type}
				placeholder={placeholder}
				className="flex-1 bg-gray-200 pl-3 outline-none"
				onChange={onChange}
				autoComplete="off"
			/>
		</div>
		{error && <p className="text-red-500 text-sm pl-3">{error}</p>}
	</div>
);

export default Registration;
