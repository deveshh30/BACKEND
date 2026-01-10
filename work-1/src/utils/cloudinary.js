import { v2 as cloudinary} from "cloudinary";
import fs from "fs";

cloudinary.config(
    {
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
        api_key : process.env.CLOUDINARY_API_KEY,
        api_secret : process.env.CLOUDINARY_API_SECRET
    }
);

const uploadCloudinary = async (localFilePath) => {
    try {
        if(!localFilePath) return null

        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type : "auto"
        })

        console.log("file is uploaded on cloudinary successfully", response.url);
        return response;
        
    } catch (error) {
        fs.unlinkSync(localFilePath) // remove the locally saved temporary file as the upload
        //operation got temporary failed.

        return null
    }
}

cloudinary.v2.uploader.upload("https://upload.wikimedia.org/wikipedia/commons/0/01/Charvet_shirt.jpg", { 
  public_id: "wiki_shirt",
  auto_tagging: 0.8},
  function(error,result) {console.log(result);
  }
);

// .then(result=>console.log(result))

export {uploadCloudinary}