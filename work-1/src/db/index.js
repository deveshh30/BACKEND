import mongoose, { connect } from "mongoose";
import { DB_NAME } from "../constants.js";

const connectDB = async () => {
    try {
        const connectionInstance = await mongoose.connect(`the connted data base name is ${process.env.MONGODB_URL}/${DB_NAME} `)
        console.log(`\n db connect hogya !! DB HOST = ${connectionInstance}`);
        
    } catch (error) {
        console.log("database connection error", error);
        process.exit(1)
        
    }
}