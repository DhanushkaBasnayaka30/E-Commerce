import mongoose from "mongoose";

const SizeSchema = new mongoose.Schema({
  size: { type: String, required: true },
  quantity: { type: Number, required: true },
});

const CartItemSchema = new mongoose.Schema({
  itemId: { type: String, required: true },
  sizes: [SizeSchema],
});

const OrderSchema = new mongoose.Schema(
  {
    Mobileno: {
      type: String,
      required: true,
    },
    Customer_Name: {
      type: String,
      required: true,
    },
    Customer_Address: {
      type: String,
      required: true,
    },
    Total_Amount: {
      type: Number,
      required: true,
    },
    Order_status: {
      type: String,
      default: "pending",
    },
    items: [CartItemSchema],
  },
  { timestamps: true } // ✅ Adds `createdAt` & `updatedAt`
);

export default mongoose.model("Order", OrderSchema);
