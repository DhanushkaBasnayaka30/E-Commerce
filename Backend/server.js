import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import { createClient } from "@supabase/supabase-js";
import ItemRoute from "./routes/ItemRoutes.js";
import CartRoute from "./routes/CartRoutes.js";
import UserRoute from "./routes/UserRoute.js";
import UserAuthorize from "./Authentication/Authenticationmjs";
import cookieParser from "cookie-parser";
import bodyParser from 'body-parser';
import session from 'express-session'; 

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 8091;
const mongoURL = process.env.MONGO_URI;

// Check for required environment variables
if (!mongoURL) {
  console.error("Error: MONGO_URI is not defined in environment variables.");
  process.exit(1);
}

// CORS configuration to allow credentials
app.use(
  cors({
    origin: ["http://localhost:5178","https://ecommerce-54e07.web.app/","https://ecommerce-54e07.firebaseapp.com"], // Replace with your frontend URL
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true, // Allow cookies to be sent with requests
  })
);

// Middleware setup
app.use(cookieParser());  // Cookie parser middleware
app.use(express.json());   // JSON body parser
app.use(bodyParser.urlencoded({ extended: true })); // URL-encoded body parser

// Session configuration for storing session data on the server
app.use(
  session({
    secret:process.env.JWT_SECRET_KEY,
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: process.env.NODE_ENV === "production", // Set to true in production
      httpOnly: true,
      sameSite: false,
    },
  })
);


// MongoDB connection
mongoose
  .connect(mongoURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("MongoDB connection successful");
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
  });

// Routes
app.use("/api", ItemRoute);
app.use("/api/cart",UserAuthorize, CartRoute);
app.use("/api/user", UserRoute);


export default app;
