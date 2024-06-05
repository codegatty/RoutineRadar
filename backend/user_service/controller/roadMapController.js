const async_handler=require("express-async-handler")
const axios=require('axios')
const User=require("../model/userModel")
const {addExpBadge}=require("../utils/BadgeFunctions")
//pass
const createRoadMap=async_handler(async(req,res)=>{
    const {title,description,userId}=req.body

    if (!title || !description || !userId) {
        return res.status(400).json({ message: "please fill all fields" });
    }
    const finalData={
        title:title,
        description:description,
        userId:userId,
        paths:[]
    }

    const user=await User.findById(userId)
    if(!user){
        return res.status(400).json({ message: "User does not exist" });
    }

    axios.post("http://localhost:5009/roadmap",finalData)
    .then(async (response)=>{
        
        const newExperience= user.experience+30
        
        const resp= await User.findByIdAndUpdate(
            userId,
            {
              experience: newExperience,
            },
            { new: true }
          );

          addExpBadge(userId);
        return res.status(200).json(response.data)
    }).catch((error)=>{
        return res.status(400).json(error.message)
    })
})
//pass
const addPaths=async_handler(async(req,res)=>{
    const id=req.params.id
    const {userId,path}=req.body 

    const finalData={
        path
    }

    if(path.name && path.isCompleted){
        return res.status(400).send({message:"invalid data "});
    }

    axios.put("http://localhost:5009/roadMap/add_path/"+id,finalData).then((response)=>{
        return res.status(200).json(response.data)
    }).catch((err)=>{
        return res.status(400).json({message:err.message})
    })
    
})

const updateIsCompleted=async_handler(async(req,res)=>{

    const id=req.params.id
    const {userId,pathId,isCompleted}=req.body 

    const finalData={
        pathId,
        isCompleted
    }

    axios.put("http://localhost:5009/roadMap/update_isCompleted/"+id,finalData).then((response)=>{
        return res.status(200).json(response.data)
    }).catch((err)=>{
        return res.status(400).json({message:err.message})
    })

})

//pass
const deleteRoadMap=async_handler(async(req,res)=>{

    axios.delete("http://localhost:5009/roadmap/"+req.params.id)
    .then((response)=>{


        return res.status(200).json(response.data)
    }).catch(()=>{
        return res.status(400).json({message:"couldn't delete roadmap"})
    })
})
//pass
const getRoadMapsByUserId=async_handler(async(req,res)=>{

    axios.get("http://localhost:5009/roadmap/"+req.params.userId)
    .then((response)=>{
        return res.status(200).json(response.data)
    }).catch(()=>{
        return res.status(400).json({message:"couldn't fetch roadMaps"})
    })

})

module.exports={createRoadMap, updateIsCompleted, deleteRoadMap, getRoadMapsByUserId,addPaths}

