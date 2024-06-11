const asyncHandler=require("express-async-handler");
const axios=require('axios');


const user_service_ip="http://172.18.0.7:5002"

//@desc get all users from users_microservice
//@route GET /admin/users
//@access private
const getAlluers=async(req,res)=>{
    try{
        const response=await axios.get(`${user_service_ip}/user/getAllUsers`);
        res.status(200).json(response.data)
    
    }catch(err){
        console.log(err)
        res.status(400).json({msg:"couldn't get all users"})
    }
    
}

module.exports={getAlluers}