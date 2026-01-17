import mongoose from "mongoose";

const connnectDB = async () => {
    try {
        const connectionInstance = await mongoose.connect(
            process.env.MONGODB_URL
        );

        console.log(`mongo db connected ${connectionInstance.connection.host}`);
        
    } catch (error) {
        console.log("Mongo DB connection failed", error);
        process.exit(1);
        
    }
}

export {connnectDB}