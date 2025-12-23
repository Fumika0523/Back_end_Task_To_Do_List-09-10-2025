const Transaction = require ('../models/Transaction')

// Add a new transaction
const addTransaction = async(req,res)=>{
// try{
    const transaction = await Transaction.create({
    ...req.body, // Use data sent from frontend (amount, type, etc.)
    user:req.userId   // Link transaction to the logged-in user
 } )
    res.status(201).json({success:true, transaction})
// }catch(e){
//     console.log("Error in addTransaction",e)
//     res.status(500).json({ success: false, message: error.message });
// }
}

//Get ALl transactions
const getTransactions = async(req,res)=>{
  //  try{
// Only return transactions for the logged-in user
    console.log("Fetching transactions for user:", req.userId);
    const allTransactions = await Transaction.find({user:req.userId}).sort({date:-1})
     res.status(201).send({success:true, allTransactions})
    //return res.send({user:req.userId})
    // }catch(error){
    //     console.log("Get transactions error:",error)
    //     return res.send(500).send({
    //         success:false,
    //         message:error.message
    //     })
    // }
}

//update

const updateTransaction = async (req, res) => {
  try {
    const { id } = req.params; // /transactions/:id >> req.params = { id: "the-value-in-URL" }
    //res.json({id})
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

//Delete
const deleteTransaction = async(req,res)=>{
    try{
        const {id} = req.params
        const transaction = await Transaction.findOneAndDelete({_id:id, user:req.userId})
            if (!transaction) return res.status(404).json({ success: false, message: "Transaction not found" });

    res.json({ success: true, message: "Transaction deleted" });

    }catch(e){
        console.log("Error in deleting transaction",e)
        return res.status(500).send({message:error.message})
    }
}

module.exports = { addTransaction, getTransactions, updateTransaction, deleteTransaction };

//Why do we use req.userId in every query?
// We use req.userId to ensure that each transaction is associated with the current logged-in user. This prevents user from accessing or modifying another user's transactions.

// What is the purpose of {new:true} in findOneAndUpdate?
//>> {new:true} tells Mongoose to return the updated document instead of the original one. Without it, findOneAndUpdate would return the document before the updated.

// How does the controller ensure users cannot manipulate others' transactions?
// >> By including user;req,userId in the query, we restrict the update/delete operation to the owner of the transaction. Even if someone knows another transaction's _id, they cannot modify it because the userId wont match.