const asyncHandler=require("express-async-handler");
const axios=require('axios');

//@desc get all users from users_microservice
//@route GET /admin/users
//@access private
const getAlluers=async(req,res)=>{
    try{
        const response=await axios.get('http://localhost:5002/users/getAllUsers');
        res.status(200).json(response.data)
    
    }catch(err){
        res.status(400).json({msg:"couldn't get all users"})
    }
    
}

module.exports={getAlluers}