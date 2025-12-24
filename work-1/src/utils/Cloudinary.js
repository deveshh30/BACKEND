import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

cloudinary.config({
  cloud_name: "process.env.CLOUDINARY_CLOUD_NAME",
  api_key: "process.env.CLOUDINARY_API_KEY",
  api_secret: "process.env.CLOUDINARY_API_SECRET", // Click 'View API Keys' above to copy your API secret
});

const uploadFile = async (localFilePath) => {
  try {
    if (!localFilePath) return "could not find the path";

    //upload file on cloudinary
    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto",
    });

    //now file has beenn successfully uploaded.
    console.log("successfully uploaded file", response.url);
    return response;
  } catch (error) {
    fs.unlinkSync(localFilePath); //this will remove the locslly saved temporary file as the upload operation got failed
    return null;
  }
};
