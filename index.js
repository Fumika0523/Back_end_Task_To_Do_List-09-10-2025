const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const Port = 8001;

// 1) Load env
dotenv.config();

// 2) DB connection
const connection = require("./db/connection");
connection();

const app = express();

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
const userRoutes = require("./routes/User");
app.use(userRoutes); 

// health check
app.get("/", (req, res) => {
  res.send({ message: "AI Expense Tracker server is running" });
});

app.listen(Port, () => console.log(`Server running on ${Port}`));
