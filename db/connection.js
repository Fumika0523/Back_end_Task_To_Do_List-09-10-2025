const mongoose = require('mongoose')

const connection = async()=>{
    await mongoose.connect(process.env.MONGO_URL)
    console.log("Mongo DB is connected")
}

module.exports=connection