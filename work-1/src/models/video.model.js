import  mongoose, {Schema} from "mongoose"
import { JsonWebTokenError } from "jsonwebtoken"
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2"
import bcrypt from "bcrypt"

const videoSchema = new Schema ({
    videoFile : {
        type : [String, " video file is required."],
        required : true,
    },
    thumbnail :{
        type : [String, " thumbnail file is required."],
        required : true,
    },
    title :{
        type : [String, " title is required."],
        required : true,
    },

    description : {
        type : String,
        required: true,
    },
    duration : {
        type: Number,
        required : true,
    },
    views: {
        type : Number,
        required : true,
        default : 0
    },
    publish : {
        type : Boolean,
        default : true
    },
    author:{
        type : Schema.Types.ObjectId,
        ref : "User"
    }
},
{timestamps:true}
)


export const Video = mongoose.model("Video", videoSchema)