import bcrypt from "bcrypt";
import UserModule from "../modules/UserModule.js";
import jwt from "jsonwebtoken";
import cookieParser from 'cookie-parser';

export const Registration = async (req, res) => {
	console.log(req.body);
	const { name, mobile, password } = req.body;

	try {
		// Check if the user already exists in the database
		const existUser = await UserModule.findOne({ mobile });
		if (existUser) {
			console.log("User already exists");
			return res.status(409).json({ message: "User already exists" });
		}

		// Generate salt and hash the password
		const salt = await bcrypt.genSalt(10);
		const hashedPassword = await bcrypt.hash(password.toString(), salt);

		// Create a new user instance from your UserModule (Mongoose model)
		const newUser = new UserModule({
			name,
			mobile,
			password: hashedPassword,
		});

		// Save the new user to the database
		const savedUser = await newUser.save();
		console.log(savedUser);
		if (savedUser) {
			console.log("New User:", savedUser);
			return res.status(201).json({ message: "User registered successfully" });
		}
	} catch (error) {
		console.error("Error during registration:", error);
		return res.status(500).json({ message: "Server error" });
	}
};

export const Login = async (req, res) => {
	console.log(req.body);
	try {
		const { mobile, password } = req.body;
		console.log(mobile, password);

		// Check if user exists
		const ExistUser = await UserModule.findOne({ mobile });
		if (!ExistUser) {
			return res.status(404).json({ message: "Cannot find this number" });
		}

		console.log("Password:", ExistUser.password);

		// Compare provided password with the hashed password
		const isMatch = await bcrypt.compare(password, ExistUser.password);
		if (isMatch) {
			console.log("Login successful!");

			// Generate a JWT token
			const token = jwt.sign({ id: mobile }, process.env.JWT_SECRET_KEY, {
				expiresIn: "1d",
			});
			const name = ExistUser.name;
			console.log("token", token);

			// Set token as cookie in the response
			return res
				.cookie("jwtToken", token, {
					httpOnly: true,
					maxAge: 24 * 60 * 60 * 1000,
				})
				.json({
					Login: true,
					token:token, // Set to true for successful login
					message: "Login successful",
					mobile: mobile,
					name: name,
				});
		} else {
			console.log("Invalid credentials.");
			return res.status(401).json({ message: "Invalid credentials" });
		}
	} catch (error) {
		console.error("Error during login:", error);
		return res.status(500).json({ message: "Server error" });
	}
};
