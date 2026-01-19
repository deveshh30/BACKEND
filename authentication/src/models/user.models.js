import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";


const userSchema = new mongoose.Schema(
    {
        // userName : {
        //     type : String,
        //     lowercase : true,
        //     required : false

        // },

        email : {
            type: String,
            required: true,
            unique : true,
            lowercase : true,
            trim : true
        },

        password : {
            type : String,
            required : true,
            select : false, //for safety purpose so that is doesnt leak accidentaly
        },
        fullName : {
            type : String,
            required : false
        }
    }, {timestamps : true }
);

userSchema.pre("save", async function () {
    //the pre is used so that no user
    //can get saved with a plain password
    if(!this.isModified("password")) return;
    this.password = await bcrypt.hash(this.password,8);
});

userSchema.methods.isPasswordCorrect = function(password) {
    return bcrypt.compare(password, this.password)
}


export const User = mongoose.model("User", userSchema)