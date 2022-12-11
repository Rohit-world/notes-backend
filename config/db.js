const mongoose=require("mongoose")
require("dotenv").config()
mongoose.set('strictQuery', false)
const DBconnection=mongoose.connect(process.env.MONGO_URL)
module.exports={DBconnection}