import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import { createClient } from "@supabase/supabase-js";
import ItemRoute from "./routes/ItemRoutes.js";
import CartRoute from "./routes/CartRoutes.js";
import UserRoute from "./routes/UserRoute.js";

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


// Create Supabase client
// const supabase = createClient(supabaseUrl, supabaseAnonKey);

// CORS configuration

app.use(
  cors({
    origin: "*",
  })
);

// JSON parser middleware
app.use(express.json());

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
app.use("/api/cart", CartRoute);
app.use("/api/user", UserRoute);

export default app;
