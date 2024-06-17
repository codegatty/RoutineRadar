const asyncHandler = require("express-async-handler");
const ArchivedRoutine=require("../model/archivedRoutineModel")
const Routine=require("../model/routineModel")

const getArchivedRoutines=asyncHandler(async(req,res)=>{
    const userId=req.params.id
    
    const response=await ArchivedRoutine.find({userId:userId},{_id:1,
        createdAt:1,
        goal:1,
        type:1,
        score:1,
        badges:1
    })

    res.status(200).json(response)
})

const reUseRoutine=asyncHandler(async(req,res)=>{
    const routineId=req.params.routineId
    const currentRoutine=await ArchivedRoutine.findOne({_id:routineId},{_id:0,__v:0,updatedAt:0,createdAt:0})
    const data={
        goal:currentRoutine.goal,
        type:currentRoutine.type,
        userId:currentRoutine.userId,
        tasks:currentRoutine.tasks,
        score:currentRoutine.score,
        badges:currentRoutine.badges,
      }
    const response=await Routine.create(data)
    await ArchivedRoutine.deleteOne({_id:routineId})
    if(!response){
        return res.status(400).json({message:"couldn't create routine in archived routines"}
        )
    }
    return res.status(201).json(response);
})

module.exports={getArchivedRoutines,reUseRoutine}