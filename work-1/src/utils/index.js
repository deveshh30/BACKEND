
import dotenv from "dotenv"
import connectdb from "./Users/devesh/Documents/BACKEND/work-1/src/index.js"; 

dotenv.config({
    path : './env'
})

connectdb()



// import mongoose from "mongoose";
// import { DB_NAME } from "./constants";
// ( async () => {
//     try {
//        await mongoose.connect(`${process.env.MONGODB_URL}/${DB_NAME}`)
//     } catch (error) {
//         console.log("ERROR" : error);
//         throw error

//     }
// } ) ()