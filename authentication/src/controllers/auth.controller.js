import { User } from "../models/user.models";
import jwt from "jsonwebtoken";

const registerUser = asyncHandler( async ( req , res ) => {
    
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
            return res.status(209)
                .json({
                    message : "user with this email already existed in our database"
                }
        };

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
                    message : error.message
                }
    } 

});



export {registerUser
}