import mongoose, {Schema, SchemaType} from "mongoose";

const userSchema = new Schema ({
      username: {
        type : String,
        unique : true,
        lowecase : true,
        trim : true,
        index : true
      },

      email: {
        type : String,
        unique : true,
        lowecase : true,
        trim : true,
      },

      fullName: {
        type : String,
        unique : false,
        lowecase : false,
        trim : false,
        index : true
      },

      avatar : {
        type : String,
        required : true,
      },

      coverImage : {
        type : String,
        required : false,
      },

      watchHistory : {
        type : Schema.Type.ObjectId,
        ref : "Video"
      },

      password: {
        type : String,
        required : [true, "password is required"],

      },

      refreshToken : {
        type :String
      },

},
{timestamps : true}

)

userSchema.pre("Save", sync function(next){
    if(!this.Modified("password")) return next();
    this.password = bcrypt.hash(this.password,10)
    next()
    // if(this.Modified("password")) {
    // this.password = bcrypt.hash(this.password,10)
    // next() this also do the same job
    // }


    userSchema.methods.isPasswordCorrect = async function (password) {
        return await bcrypt.compare(password, this.password)
    }
})


userSchema.methods.generateAccessToken = function () {
    return jwt.sign(
        {
        _id : this.id,
        email : this.email,
        userName : this.userName,
        fullName: this.fullName

        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn : process.env.ACCESS_TOKEN_EXPIRY
        }
    },

)
}


userSchema.methods.generateRefreshToken = function () {
    return jwt.sign(
        {
        _id : this.id,
        

        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn : process.env.REFRESH_TOKEN_EXPIRY
        }
    },

)
}

export const User = mongoose.model("Users", userSchema)