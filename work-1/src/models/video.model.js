import mongoose from "mongoose";
import { Schema } from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";
import bcrypt from "bcryptjs";
import { JsonWebTokenError } from "jsonwebtoken";
import { User } from "./user.models";
import jwt from "jsonwebtoken";




const userSchema = new Schema (
    {
        videoFile : {
            type : String,
            unique : true,
            lowercase : true,
            require : true,
        },
        thumbnail : {
            type : String,
            unique : false,
        },
        title : {
            type : String,
            unique : false,
        },
        description : {
            type : String,
            unique : false,
        },
        duration : {
            type : number ,
            required : true,
        },
        views : {
            type : number,
            required : true,
            default : 0
        },
        isPublished : {
            type :Boolean,
            default : true,
        },
        owner : {
            type : Schema.Types.ObjectId,
            ref : "user num"
        }
    }, {
        timestamps : true,
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

export const video = mongoose.model("video", userSchema)