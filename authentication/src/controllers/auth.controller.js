import { User } from "../models/user.models.js";
import jwt from "jsonwebtoken";
import {asyncHandler} from "../utils/asyncHandler.js"

const registerUser =  asyncHandler (async ( req , res ) => {
    
    try {
        const { email, fullName, password} = req.body;

        
    
        if(
            [fullName, email, password].some((field)=> field?.trim() === "")) {
                return res.status(400)
                .json({
                    message : "all fields are required"
                })
            }
        
    
        const existedUser = await User.findOne({
            $or : [{email}] //or operator is used in monngo db to matchh
        })
    
        if(existedUser) {
            return res.status(409)
                .json({
                    message : "user with this email already existed in our database"
                })
        }

        const user = await User.create({
            fullName,
            email,
            password
        });

        const createduser = await User.findById(user._id).select(
            "-password"
        )

        if(!createduser) {
            return res.status(404)
            .json({
                message : "failed to create a user"
            })
        }

        return res.status(201)
        .json({
            message : "user created successfully"
        });
    
    } catch (error) {
        return res.status(400)
                .json({
                    message : error.message,
                    user : createduser,
                    token
                })
    } 

});

const loginUser = asyncHandler(async ( req , res ) => {
    try {
        const { email , password } = req.body;

        if(!email || !password) {
            return res.status(404)
            .json({
                message : "email is required to log-in"
            })
        }

        const user = await User.findOne({email})
        .select("+password");

        if (!user) {
            return res.status(400)
            .json({
                message : "user with this email does not exist"
            })
        }

        const isPasswordValid = await user.isPasswordCorrect(password)

        if(!isPasswordValid) {
            return res.status(401)
            .json({
                message : " invalid user credentials "
            })
        }

        const token = jwt.sign(
            { id : user._id },
            process.env.JWT_SECRET,
            { expiresIn : process.env.JWT_EXPIRY, }
        )

        return res
        .status(200)
        .json({
            message : "user logged in successfully",
            token,
            email,
            user_id
        })
        
    } catch (error) {
        return res.status(404)
        .json({
            message : error.message , 
        })
    }
});

export {registerUser,
    loginUser
}