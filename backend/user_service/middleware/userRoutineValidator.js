const asyncHandler=require("express-async-handler")
const User=require("../model/userModel")

const userRoutineValidator=asyncHandler(async(req,res,next)=>{

    const userId=req.params.id

    const user=await User.findOne({_id:userId});
    if(!user ) {
      return res.status(404).json({msg:"user does not exist"})
    }else if(user.isRoutineCreated===false){
      return res.status(404).json({msg:"user does not have current routine"})
    }
    next();

});

module.exports=userRoutineValidator;