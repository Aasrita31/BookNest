
import mongoose from "mongoose";
const BookSchema = new mongoose.Schema({
  title:String,
  author:String,
  genre:String,
  price:Number,
  sellerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    }
},{timestamps:true});
export default mongoose.model("Book",BookSchema);
