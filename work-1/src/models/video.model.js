import mongoose, { SchemaType, SchemaTypes } from "mongoose";
import { Schema } from "mongoose";

const videoSchema = new Schema (
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