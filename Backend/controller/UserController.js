import bcrypt from "bcrypt";
import UserModule from "../modules/UserModule.js";
import jwt from "jsonwebtoken";

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
	try {
		const { mobile, password } = req.body;
		console.log(mobile, password);

		const ExistUser = await UserModule.findOne({ mobile });
		if (!ExistUser) {
			return res.status(404).json({ message: "Can not find this number" });
		}

		console.log("Password:", ExistUser.password);
		const isMatch = await bcrypt.compare(password, ExistUser.password);
		if (isMatch) {
			console.log("Login successful!");

			const token = jwt.sign({ id: mobile }, process.env.JWT_SECRET_KEY);
			const name = ExistUser.name;
			return res
				.cookie("jwtToken", token, {
					httpOnly: true,
					maxAge: 24 * 60 * 60 * 1000, // 1 day
				})
				.json({
					Login: true,
					message: "Login successful",
					mobile: mobile,
          name:name
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
