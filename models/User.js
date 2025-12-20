const mongoose = require('mongoose')
const jwt = require("jsonwebtoken")


const userSchema=new mongoose.Schema(
    {
        username:{
            type:String,
            required:[true,"Username is required"],
            unique:true,
        },
        email:{
            type:String,
            required:[true,"Email is required"],
            unique:true
        },
        password:{
            type:String,
            required:[true,"Password is required"],
            minlength:8,
        },
        role: {
            type: String,
            enum: ["user", "admin"],
            default: "user",
         },
    },
     { timestamps: true }
)

//userSchema.methods = where you define instance methods for this schema
//generateAuthToken = the name of the method >> every User document(e.g const user = await User.findById(...)) will have a function you can call:
userSchema.methods.generateAuthToken = async function(){
const user = this; // inside a Mongoose instance method, this refer to the current document. The inside generateAuthToken, this is the same user you just found
const token = jwt.sign({ // jwt.sign() creates (sign) a JWT token
// a payload >> what data you want inside the token
// a secret key >> used to sign and later verify the token
// some options >> like expiration time
    _id:user.id,
    role:user.role },
    process.env.JWT_SECRET_KEY, // make sure this exists in .env
    )
    console.log(token)
   return token
}



const User = mongoose.model("User",userSchema)
module.exports = User