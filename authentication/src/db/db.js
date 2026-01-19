import mongoose, { mongo } from "mongoose";

const connectDB = async () => {
    try {
        const connectionInstance = await mongoose.connect(process.env.MONGODB_URL)
    } catch (error) {
        console.log("Mongo DB connection failed", error);
        process.exit(1);

    }
};


export {connectDB}