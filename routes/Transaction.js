const express = require("express");
const router = express.Router();
const { addTransaction, getTransactions, updateTransaction, deleteTransaction  } = require("../controllers/Transaction");
const auth = require("../midlleware/auth");

// All routes here require login
router.post("/add",auth, addTransaction);    
router.get("/get",auth, getTransactions);     
router.put("/update/:id",auth,updateTransaction)
router.delete("/delete/:id",auth,deleteTransaction)

module.exports = router;
