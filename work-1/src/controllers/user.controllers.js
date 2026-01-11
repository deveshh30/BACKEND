import { asyncHandler } from "../utils/asyncHandle.js";
import {ApiError} from "../utils/ApiError.js";
import {User, user} from "../models/user.models.js";
 
const registerUser = asyncHandler( async (req, res) => {

    //get user detail from frontend
    // validation - should not be empty
    // check if user already exists or not via username or email
    // check for image and avatar
    // upload them to cloudinary avatar, 
    //create use object - and create entry in database
    //REMOVE password and refresh tokenn field from responnse
    // check for user creation
    // return userr



    const {fullName, email, userName, password} = req.body
    console.log("email : ", email);

    //APPROACH 1

    // if(fullName === "") {
    //     throw new ApiError (400, "full name is required")
    // }
    
    //APPROACH 2

    if (
        [fullName, email , userName, password].some((field) => field.trim  () === "")
    ) {
        throw new ApiError (400, "full name is required")
    }

    const existedUser =  User.findOne({
     $or : [{userName}, {email}]
    })
    
    if(existedUser) {
        throw new ApiError(409, "user with this email or username already existed")
    }

    const avatarLocalPath = req.files?.avatar[0]?.path;

    if(!avatarLocalPath) {
        throw new ApiError(400, "avatar image is required")
    }

    const coverImageLocalPath = req.files?.coverImage[0]?.path;
})

export {
    registerUser,
}