import mongoose, { SchemaType, SchemaTypeOptions } from "mongoose";
import { Schema } from "mongoose";

const userSchema = new Schema(
    {
        username : {
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

export const User = mongoose.model("User", userSchema)