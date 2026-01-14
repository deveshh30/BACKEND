import { asyncHandler } from "../utils/asyncHandle.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.models.js";
import { uploadCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";

 

const registerUser = async (req, res) => {
    console.log("FILES:", req.files);
    console.log("BODY:", req.body);

    
    const { fullName, password, userName, email } = req.body;
    console.log("email : ", email);


    // we can also do with this approach in which we have to write 
    // for each fields itself thhats also good but there is a better approach
    
    /*(fullName === "") {
      throw new ApiError(400, "full name is required")
    }*/
    

      if (
        [fullName, email, userName, password].some((field)=> field?.trim() === "" )) {
          throw new ApiError(400, "all fields are required")
        } // return boolean value
       
      


      const existed_User = await User.findOne({
        $or : [{ email } , { userName }]
      })

      if(existed_User) {
        throw new ApiError(409, "user with these fields already existed")
      }

      const avatarLocalPath = req.files?.avatar?.[0]?.path;
    //const coverImageLocalPath = req.files?.coverImage[0]?.path;

    let coverImageLocalPath;
    if (req.files && Array.isArray(req.files.coverImage) && req.files.coverImage.length > 0) {
        coverImageLocalPath = req.files.coverImage?.[0]?.path
    }
    

    if (!avatarLocalPath) {
        throw new ApiError(400, "Avatar file is required")
    }

    const avatar = await uploadCloudinary(avatarLocalPath)
    const coverImage = await uploadCloudinary(coverImageLocalPath)

    if (!avatar) {
        throw new ApiError(400, "Avatar file is required")
    }
   

    const user = await User.create({
        fullName,
        avatar: avatar.url,
        coverImage: coverImage?.url || "",
        email, 
        password,
        userName: userName.toLowerCase()
    })

    const createdUser = await User.findById(user._id).select(
        "-password -refreshToken"
    )

    if (!createdUser) {
        throw new ApiError(500, "Something went wrong while registering the user")
    }

    return res.status(201).json(
        new ApiResponse(200, createdUser, "User registered Successfully")
    )
   
}

export { registerUser }
