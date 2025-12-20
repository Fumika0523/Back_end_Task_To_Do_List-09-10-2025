const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const userRoutes = require("./routes/User");
const transactionRoutes = require("./routes/Transaction")
const Port = 8001;
const app = express()
const connection = require("./db/connection");


// 1) Load env
dotenv.config();

// 2) DB connection
connection();

console.log("JWT_SECRET_KEY:", process.env.JWT_SECRET_KEY);


// 3) Middleware
app.use(
  cors({
    origin: "http://localhost:5173", // change later if needed
    credentials: true,               // allow cookies from frontend
  })
);
app.use(express.json());
app.use(cookieParser());

// 4) Routes
app.use(userRoutes); 
app.use(transactionRoutes)

// health check
app.get("/", (req, res) => {
  res.send({ message: "AI Expense Tracker server is running" });
});

app.listen(Port, () => console.log(`Server running on ${Port}`));
