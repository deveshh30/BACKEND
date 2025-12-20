import mongoose from "mongoose";
import { DB_NAME } from "../utils/constants.js";

const connectdb = async () => {
    try {
        const connectionInstant = await mongoose.connect(`${process.env.MONGODB_URL}/${DB_NAME}`)
        console.log(`mongo database is connected succesfully !! DB HOST = ${connectionInstant)`;
        
    } catch (error) {
        console.log("ERROR in connnection", error);
        process.exit(1)
        
    }
}

export default connectdb;