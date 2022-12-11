const { UserModel } = require("../models/user.model");

const signupCheck=async(req,res,next)=>{
const {name,email,password}=req.body
console.log(req.body)
if(name && email && password ){
const ispresent=await UserModel.findOne({email:email})
if(ispresent){
    return res.send({"msg":"user Already exist please Login"})
}
next()
}else{
    return res.send({"msg":"Wrong Credentials"})
}


}
module.exports={signupCheck}