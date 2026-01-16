import mongoose, { SchemaType, SchemaTypeOptions } from "mongoose";
import { Schema } from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema(
  {
    userName: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    fullName: {
      type: String,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
      required: true,
    },
    coverImage: {
      type: String,
    },
    refreshToken: {
      type: String,
    },
  },
  { timestamps: true }
);



// we can not use arrow function here because it doesnt contain reference and here we need 
// refrence from the user or video schema model we created just above this..


userSchema.pre("save", async function () {
  if (!this.isModified("password")) return;
  this.password = await bcrypt.hash(this.password, 8);
});


userSchema.methods.isPasswordCorrect = function (password) {
    return bcrypt.compare(password, this.password)
}


userSchema.methods.generateAccessToken = function () {
    return jwt.sign(
        {
            _id : this._id,
            email: this.email,
            userName: this.userName,
            fullName: this.fullName
            
        },
        process.env.ACCESS_TOKEN_SECRET,{
            expiresIn : process.env.ACCESS_TOKEN_EXPIRY
        }

        
       ) }

userSchema.methods.generateRefreshToken = async function () {
            return jwt.sign(
               {
                _id : this._id,
                email: this.email,
                userName: this.userName,
                fullName: this.fullName
        
            },
            process.env.REFRESH_TOKEN_SECRET,{
                expiresIn : process.env.REFRESH_TOKEN_EXPIRY
            } 
            ) }

export const User = mongoose.model("User", userSchema)