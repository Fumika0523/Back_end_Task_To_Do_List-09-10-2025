const jwt = require('jsonwebtoken');
console.log("jwt",process?.env?.JWT_SECRET_KEY)
if (!process.env.JWT_SECRET_KEY) {
  throw new Error('JWT_SECRET_KEY is not defined');
}
const JWT_SECRET = process.env.JWT_SECRET_KEY;

const auth = async (req, res, next) => {
  console.log("Auth Middleware is calling");

  try {
    const token = req.cookies.token;
    console.log("token", token);

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "No token provided. Please sign in"
      });
    }

    // Verify token with secret
    const decoded = jwt.verify(token, JWT_SECRET);
    // decoded will have: { _id, role, iat, exp }
  console.log("decoded token:", decoded);  
    //  Attach data to req for later use
    req.userId = decoded.userId;
    req.userRole = decoded.role;

    next();
  } catch (e) {
    console.log("Authentication Error:", e);
    return res.status(401).json({
      success: false,
      message: "Authentication Error"
    });
  }
};

module.exports = auth;
