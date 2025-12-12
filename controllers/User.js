const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// choose a secret key from env, with a fallback
const createSecretKey =
  process.env.JWT_SECRET || process.env.JWT_SECRET_KEY || 'nodejs';

const signUp = async (req, res) => {
  try {
    console.log("req.body", req.body);

    // 1) Check if the user is already registered
    let user = await User.findOne({
      $or: [
        { email: req.body.email },
        { username: req.body.username },
      ],
    });

    if (user) {
      console.log(
        "User is already registered, please sign in",
        req.body.email
      );
      return res
        .status(400)
        .send("User is already registered, please sign in");
    }

    // 2) Password hashing
    const salt = await bcrypt.genSalt(8);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    // 3) Save user
    const userData = new User({
      ...req.body,
      password: hashedPassword,
    });

    await userData.save(); // saving data
    console.log("New user saved:", userData._id.toString());

    // 4) Create JWT token
    const token = jwt.sign(
      { _id: userData._id, role: userData.role },
      createSecretKey,
      { expiresIn: "1d" } // match cookie lifetime nicely
    );

    // 5) Set cookie
    res.cookie("token", token, {
      httpOnly: true,
       secure: false,   // false in dev, true in prod
      sameSite: "lax",
      maxAge: 24 * 60 * 60 * 1000, // 1 day
    });

    // 6) Send response
    return res.status(201).json({
      success: true,
      token,         // or jwt: token if you prefer
      user: userData,
      message: "Successfully registered a new user!",
    });
  } catch (e) {
    console.log("Error", e);
    return res
      .status(500)
      .send("Some Internal Error Occurred");
  }
};

const signIn = async(req,res)=>{
    try{
        console.log("req.body",req.body)
        const user = await User.findOne({email:req.body.email})
        if(!user){
            console.log("SignIn failed: user not found",email)
            return res.status(401).send({
                success:false,
                message:"Invalid email or password"
            })
        }

        const isMatch = await bcrypt.compare(req.body.password,user.password)
        if(!isMatch){
            console.log("SignIn failed: wrong password",email)
            return res.status(401).send({
                sucesses:false,
                message:"Invalid password, please check again"
            })
        }

        // create JWT token
        const token = jwt.sign(
            {_id:user._id, role:user.role},
            createSecretKey,
            {expiresIn:"1d"}
        )

        //set cookie
        res.cookie("token",token,{
            httpOnly:true,
            secure:false,
            sameSite:'lax',
            maxAge: 24 * 60 * 60 * 1000, // 1 day

        })

        //send response
        return res.status(200).send({
            success:true,
            token,
            user,
            message:"Successfully Sign in !"
        })
    }catch(e){
        console.error("Error",e)
        res.status(500).send("Some Internal Error")
    }
}

module.exports = { signUp , signIn};
