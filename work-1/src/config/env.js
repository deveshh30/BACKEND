import dotenv from "dotenv";

dotenv.config();

if (!process.env.CLOUDINARY_CLOUD_NAME) {
  throw new Error("❌ Environment variables not loaded");
}

// this file is created because .ennv file was loading late which led to give error this will
// priortise loading of env file