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


const User = mongoose.model("User",userSchema)
module.exports = User


//When the user signs up/sign in , the controller creates and save a new User documents with your mode, then calls user.generateAuthToken() to create a JWT(using the user's _id and role) and finally sends that token back to the browser (in a cookie) so the user stays logged in.

//When a user signs up or logs in, the controller saves or fetches that user from MongoDB, calls user.generateAuthToken(), and inside that method const user = this refers to that saved user document, which is then used to create a JWT (with their _id and role) that the controller finally stores in a cookie to keep them logged in.