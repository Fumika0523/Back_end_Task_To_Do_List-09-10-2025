const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// if (!process.env.JWT_SECRET_KEY) {
//   throw new Error('JWT_SECRET is not defined');
// }
const JWT_SECRET = process.env.JWT_SECRET_KEY || 'dev_secret';
if (!JWT_SECRET) {
  console.error("❌ JWT_SECRET_KEY is not defined in .env!");
  //process.exit(1); // stop the server immediately
}

const signUp = async (req, res) => {
  // try {
  console.log("JWT_SECRET:", JWT_SECRET);
  console.log("JWT_SECRET_KEY from env:", process.env.JWT_SECRET_KEY);

    const { username, email, password } = req.body;
    console.log("req.body", req.body);

    // 1) Check if the user is already registered
  if (!username || !email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Username, email and password are required',
      });
    }
 
      // 2) Check if user exists
    const existingUser = await User.findOne({
      $or: [{ email }, { username }],
    });

    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: 'User already exists, please sign in',
      });
    }

    // 3) Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // 4) Save user
    const userData = new User({
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword,
    });

    await userData.save(); // saving data
    console.log("New user saved:", userData._id.toString());

    // 5) Create JWT token
    const token = jwt.sign(
      { _id: userData._id, role: userData.role },
       JWT_SECRET,
      { expiresIn: "1d" } // match cookie lifetime nicely
    );

    // 6) Set cookie
    res.cookie("token", token, {
      httpOnly: true,
       secure: false,   // false in dev, true in prod
      sameSite: "lax",
      maxAge: 24 * 60 * 60 * 1000, // 1 day
    });

    // 7) Send response
    return res.status(201).json({
      success: true,
      token,         // or jwt: token if you prefer
      user: userData,
      message: "Successfully registered a new user!",
    });
    
  // } catch (e) {
  //   console.log("Signed upError", e);
  //   return res
  //     .status(500)
  //     .send("Some Internal Error Occurred");
  // }
};

const signIn = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
      return res.status(400).json({ success: false, message: "Email and password required" });
    }

    // Find user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ success: false, message: "Invalid email or password" });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: "Invalid email or password" });
    }

    // Generate JWT
    const token = jwt.sign(
      { _id: user._id, role: user.role },
      JWT_SECRET,
      { expiresIn: "1d" }
    );

    // Set httpOnly cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 24 * 60 * 60 * 1000,
    });

    // Send safe response
    const safeUser = {
      _id: user._id,
      username: user.username,
      email: user.email,
      role: user.role,
    };

    return res.status(200).json({
      success: true,
      user: safeUser,
      message: "Successfully signed in!",
    });

  } catch (error) {
    console.error("SignIn error:", error);
    return res.status(500).json({ success: false, message: "Internal server error" });
  }
};

module.exports = { signUp , signIn};
