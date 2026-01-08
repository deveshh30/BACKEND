import mongoose, { SchemaType, SchemaTypeOptions } from "mongoose";
import { Schema } from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";
import bcrypt from "bcryptjs";
import { JsonWebTokenError } from "jsonwebtoken";
import { User } from "./user.models";
import jwt from "jsonwebtoken";

const userSchema = new Schema(
    {
        userName : {
            type : String,
            require : true,
            unique : true,
            lowecase : true,
            trim : true,
            index : true,
        },

        email : {
            type : String,
            require: true,
            unique : true,
            specialcharcater : true,
            lowecase : true,
            trim : true,
        },
        fullName : {
            type : String,
            require : false,
            unique : false,
            trim : true,
            index : true,

        },
        password:{
            type : String,
            require : true,
            unique : true

        },
        avatar : {
            type : String,
            require : true,

        },
        coverImage : {
            type : string,

        },
        watchHistory : {
            type : Schema.Types.ObjectId,
            reference : "video",
        },
        refreshToken : {
            type : string,
        }
    },
    {
        timestamps: true
    }
)


// we can not use arrow function here because it doesnt contain reference and here we need 
// refrence from the user or video schema model we created just above this..


userSchema.pre("Save", async function (next) {
    if(!this.modified("password")) return next();
    this.password = bcrypt.hash(this.password,8)
    next()
} )

userSchema.methods.isPasswordCorrect = async function (password) {
    return await bcrypt.compare(password, this.password)
}


userSchema.methods.generateAccessToken = async function () {
    jwt.sign(
        {
            _id : this._id,
            
            
        },
        process.env.ACCESS_TOKEN_SECRET,{
            expiresIn : process.env.ACCESS_TOKEN_EXPIRY
        }

        
       ) }

userSchema.methods.generateRefreshToken = async function () {
            jwt.sign(
               {
                _id : this._id,
                email: this.email,
                userName: this.userName,
                fullName: this.fullName,
        
            },
            process.env.REFRESH_TOKEN_SECRET,{
                expiresIn : process.env.REFRESH_TOKEN_EXPIRY
            } 
            ) }

export const User = mongoose.model("User", userSchema)