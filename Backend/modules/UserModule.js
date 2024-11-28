import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name:{
    type:String,
    requried:true
  },
  mobile:{
    type:Number,
    required:true
  },
  password:{
    type:String,
    required:true
  }
});
export default mongoose.model("users",userSchema);