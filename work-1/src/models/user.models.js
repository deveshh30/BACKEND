import mongoose, { SchemaType, SchemaTypeOptions } from "mongoose";
import { Schema } from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const userSchema = new Schema(
    {
        userName : {
            type : String,
            required : true,
            unique : true,
            lowercase : true,
            trim : true,
            index : true,
        },

        email : {
            type : String,
            required: true,
            unique : true,
            lowercase : true,
            trim : true,
        },
        fullName : {
            type : String,
            required : false,
            unique : false,
            trim : true,
            index : true,

        },
        password:{
            type : String,
            required : true,
            unique : true

        },
        avatar : {
            type : String,
            required : true,

        },
        coverImage : {
            type : String,

        },
        watchHistory : {
            type : Schema.Types.ObjectId,
            ref : "video",
        },
        refreshToken : {
            type : String,
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