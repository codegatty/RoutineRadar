const async_handler=require("express-async-handler")
const axios=require('axios')
const User=require("../model/userModel")
const {createAnalytics,deleteAnalytics}=require("../controller/analyticsController")


const routine_service_url=process.env.ROUTINE_SERVICE

const getArchivedRoutinesByUserId=async_handler(async (req,res)=>{
    const userId=req.params.id;
    axios.get(`${routine_service_url}/routine/archived_routine/${userId}`).then((response)=>{
        return res.status(200).json(response.data)
    }).catch(()=>{
        return res.status(400).json({message:"couldn't fetch archived routine from routine api"})
    })

    
})

const reUseArchivedRoutine=async_handler(async(req,res)=>{
    const {userId}=req.body
    const routineId=req.params.routineId
    
    axios.post(`${routine_service_url}/routine/archived_routine/re_use/${routineId}`,{userId:userId}).then(async(response)=>{
        await User.updateOne({_id:userId},{$set:{isRoutineCreated:true}})
        createAnalytics(userId);
        return res.status(200).json(response.data)
    }).catch(()=>{
        return res.status(400).json({message:"couldn't create routine from archived routine in routine api"})
    })
    

})

const deleteRoutineForever=async_handler(async(req,res)=>{
    const routineId=req.params.routineId
    
    axios.delete(`${routine_service_url}/routine/archived_routine/${routineId}`).then((response)=>{
        return res.status(200).json({message:"archived deleted"})
    }).catch(()=>{
        return res.status(400).json({message:"couldn't delete routine from archived routine in routine api"})
    })
    

})

module.exports={getArchivedRoutinesByUserId,reUseArchivedRoutine,deleteRoutineForever}


