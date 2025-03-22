import mongoose from "mongoose";

const SizeSchema = new mongoose.Schema({
  size: { type: String, required: true },
  quantity: { type: Number, required: true }
});

const CartItemSchema = new mongoose.Schema({
  itemId: { type: String, required: true }, 
  sizes: [SizeSchema] 
});

const CartSchema = new mongoose.Schema({
  mobileno: {
    type: String, 
    required: true,
    unique: true 
  },
  items: [CartItemSchema],
 
});

export default mongoose.model('carts', CartSchema);