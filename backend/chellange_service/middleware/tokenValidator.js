const jwt=require("jsonwebtoken");
const asyncHandler=require("express-async-handler");


const tokenValidator=asyncHandler(async (req,res,next)=>{
let token;
let authHeader=req.headers.authorization||req.headers.Authorization;
token=authHeader?.split(' ')[1];
if(!token){
    return res.status(401).json({message:"unauthorized"});
}
await jwt.verify(token,process.env.SECRET_KEY,(err,decodedInfo)=>{
    if(err){
       res.status(400); 
    }
        
        if(!decodedInfo){
            
           return res.status(401).json({message:"token expired"});
        }
        req.admin=decodedInfo.admin;
        next();
})



})

module.exports=tokenValidator;