import mongoose from "mongoose";
import { DB_NAME } from "../utils/constants.js";

const connectdb = async () => {
  try {
    const connectionInstance = await mongoose.connect(
      `${process.env.MONGODB_URL}/${DB_NAME}`
    );

    console.log(
      `MongoDB connected successfully !! DB HOST = ${connectionInstance.connection.host}`
    );
  } catch (error) {
    console.error("ERROR in DB connection:", error);
    process.exit(1);
  }
};

export default connectdb;
