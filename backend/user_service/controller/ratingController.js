const async_handler=require("express-async-handler")
const axios=require('axios')
const User=require("../model/userModel")

const admin_service_url=process.env.ADMIN_SERVICE

const updateRating=async_handler(async (req,res)=>{

    const userId=req.params.id;
    const {star}=req.body
    
    const user=await User.findOne({_id:userId})
    
    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }
    
    axios.put(`${admin_service_url}/admin/rating/${star}`).then(async ()=>{
        try{
        await User.findByIdAndUpdate(userId,{$set:{appRate:star}})
        }catch(e){
            console.log(e)
        }
        return res.status(200).json({message:"rating updated successfully"})
    }).catch(()=>{
        return res.status(400).json({message:"Failed to update"})
    })
    
})

module.exports={updateRating}


