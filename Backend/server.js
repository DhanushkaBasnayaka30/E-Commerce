import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import ItemRoute from "./routes/ItemRoutes.js";
import CartRoute from "./routes/CartRoutes.js";

const app = express();
app.use(cors());
app.use(bodyParser.json());
dotenv.config();

const PORT = process.env.PORT || 8091;
const mongoURL = process.env.MONGO_URI;
console.log("Environment Variables:", process.env.MONGO_URI);
console.log(PORT);
mongoose.connect(mongoURL)
  .then(() => {
    console.log("Connection Successful");
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch(err => {
    console.log("Error connecting to MongoDB", err);
  });


app.use("/api", ItemRoute); 
app.use("/api/cart/", CartRoute);
