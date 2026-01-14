import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import path from "path";

cloudinary.config(
    {
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
        api_key : process.env.CLOUDINARY_API_KEY,
        api_secret : process.env.CLOUDINARY_API_SECRET
    }
);

const uploadCloudinary = async (localFilePath) => {
    try {
        if (!localFilePath) return null;

        // convert relative path to absolute path
        const absolutePath = path.resolve(localFilePath);

        const response = await cloudinary.uploader.upload(absolutePath, {
            resource_type : "auto"
        });

        console.log("file is uploaded on cloudinary successfully", response.secure_url);

        // remove local file after successful upload
        fs.unlinkSync(absolutePath);

        return response;
        
    } catch (error) {
        console.error("Cloudinary upload failed:", error);

        // remove the locally saved temporary file as the upload
        // operation got temporarily failed.
        if (localFilePath && fs.existsSync(localFilePath)) {
            fs.unlinkSync(localFilePath);
        }

        return null;
    }
}



// .then(result=>console.log(result))

export { uploadCloudinary };
