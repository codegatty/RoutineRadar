const jwt=require("jsonwebtoken");
const asyncHandler=require("express-async-handler");


const tokenValidator=asyncHandler(async (req,res,next)=>{
let token;
let authHeader=req.headers.authorization||req.headers.Authorization;
token=authHeader?.split(' ')[1];
if(!token){
    return res.status(403).json({message:"unauthorized"});
}
await jwt.verify(token,process.env.ACCESSTOKEN_SECRET_KEY,(err,decodedInfo)=>{
    if(err){
       res.status(400); 
    }
        
        if(!decodedInfo){
            
           return res.status(403).json({message:"unauthorized"});
        }
        req.user=decodedInfo.user;
        next();
})

})

module.exports=tokenValidator;