import mongoose, { mongo } from "mongoose";

const userSchema = new mongoose.Schema (
    {
    name: {
      type: String,
    },
    email: {
      type: String,
      unique: true
    },
    age: {
      type: Number,
      min: 0
    },
    } , {timestamps : true}
);

const User = mongoose.model("User", userSchema);

export default User ;