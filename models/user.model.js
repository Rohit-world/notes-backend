const mongoose = require("mongoose");
const userScema = mongoose.Schema({
  name: String,
  email: String,
  password: String,
});

const UserModel=mongoose.model("users",userScema)


module.exports={UserModel}