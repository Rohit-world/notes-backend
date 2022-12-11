const jwt=require("jsonwebtoken")
const Authentication=async(req,res,next)=>{
const token=req.headers.token?.split(" ")[1]

if(!token)return res.send({"msg":"Not authenticated"})
    
jwt.verify(token, 'noteapp', function(err, decoded) {
    if(err)return res.send({"msg":"not authenticated please login"})
    req.body.userID=decoded.userID
    next()
  });

}

module.exports={Authentication}