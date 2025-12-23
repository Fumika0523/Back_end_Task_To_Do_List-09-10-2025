const Transaction = require ('../models/Transaction')

// Add a new transaction
const addTransaction = async(req,res)=>{
try{
    const transaction = await Transaction.create({
    ...req.body, // Use data sent from frontend (amount, type, etc.)
    user:req.userId   // Link transaction to the logged-in user
 } )
    res.status(201).json({success:true, transaction})
}catch(e){
    console.log("Error in addTransaction",e)
    res.status(500).json({ success: false, message: error.message });
}}

//Get ALl transactions
const getTransactions = async(req,res)=>{
    try{
// Only return transactions for the logged-in user
    const allTransactions = await Transaction.find({user:req.userId}).sort({date:-1})
    res.status(201).send({success:true,allTransactions })
    }catch(error){
        console.log("Get transactions error:",error)
        return res.send(500).send({
            success:false,
            message:error.message
        })
    }
}

//update

const updateTransaction = async (req, res) => {
  try {
    const { id } = req.params; // /transactions/:id

    // Only allow user to update their own transaction
    const transaction = await Transaction.findOneAndUpdate(
      { _id: id, user: req.userId },
      req.body,
      { new: true } // return updated document
    );

    if (!transaction) return res.status(404).json({ success: false, message: "Transaction not found" });

    res.json({ success: true, transaction });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};


module.exports = { addTransaction, getTransactions };