import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import path from "path";


if (
  !process.env.CLOUDINARY_CLOUD_NAME ||
  !process.env.CLOUDINARY_API_KEY ||
  !process.env.CLOUDINARY_API_SECRET
) {
  throw new Error("Cloudinary environment variables are missing");
}


cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});


const uploadCloudinary = async (localFilePath) => {
  if (!localFilePath) return null;

  const absolutePath = path.resolve(localFilePath);

  try {
    const response = await cloudinary.uploader.upload(absolutePath, {
      resource_type: "auto",
    });

    console.log("Cloudinary upload success:", response.secure_url);

    
    try {
      fs.unlinkSync(absolutePath);
    } catch (_) {}

    return response;

  } catch (error) {
    console.error("Cloudinary upload failed:", error.message);

    
    
    try {
      if (fs.existsSync(absolutePath)) {
        fs.unlinkSync(absolutePath);
      }
    } catch (_) {}

    return null;
  }
};

export { uploadCloudinary };
