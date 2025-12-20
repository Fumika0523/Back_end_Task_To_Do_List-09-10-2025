const express = require("express");
const router = express.Router();
const { createTransaction, getTransactions } = require("../controllers/Transaction");
// const auth = require("../midlleware/auth");

// All routes here require login
router.post("/",  createTransaction);    
router.get("/",  getTransactions);     

module.exports = router;
