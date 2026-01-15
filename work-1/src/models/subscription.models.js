import mongoose, {Schema, SchemaType} from "mongoose";

const subscriptionSchema = new Schema (
    {
        subscriber : {
            type : Schema.Types.ObjectId, //one who is subscribing
            ref : "User"
        },
        
        channel : {
            type : Schema.Types.ObjectId, // one whom user is subcribing
            ref : "User"
        }
    }, {
        timestamps : true
        
    }
);


export const Subscription = mongoose.model("Subscription", subscriptionSchema)