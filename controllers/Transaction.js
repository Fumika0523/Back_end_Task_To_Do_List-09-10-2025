const Transaction = require ('../models/Transaction')

//post
const createTransaction = async()=>{
    try{
        const { type, amount, category, description, date, paymentMethod, isRecurring } =
        req.body;

        if(!type || !amount || !category){
            return res.status(400).send({
                success:false,
                message:"Please fill the form"
            })
        }
   
        const transaction = new Transaction({
            userId:req.userId, //from auth middleware
            type,
            amount,
            category,
            description,
            date,
            paymentMethod,
            isRecurring,
        })

        await transaction.save()

        return res.status(201).send({
            success:true,
            message:"Transaction created successfully!",
            transaction,
        })

    }catch(e){
        console.error("Create Transaction error:",error)
        return res.status(500).json({
        success: false,
        message: "Internal server error.",
    });
    }
}

//Get transactions
const getTransactions = async(req,res)=>{
    try{
    const {type, category} = req.query
    const query = {userId:req.userId} // only this user’s data

    if(type) query.type =type;
    if(category) query.category = category;

    const transactions = (await Transaction.find(query)).sort({ date: -1 });

    return res.status(200).send({
        success:true,
        cout:transactions.length,
        transactions,
    })
    }catch(e){
        console.log("Get transactions error:",error)
        return res.status(500).send({
            success:false,
            message:"Internal server error."
        })
    }
}

module.exports = { createTransaction, getTransactions };