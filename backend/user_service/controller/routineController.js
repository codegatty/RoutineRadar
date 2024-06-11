const asyncHandler = require("express-async-handler");
const axios = require("axios");
const User = require("../model/userModel");
const {addExpBadge,firstRoutineBadge}=require("../utils/BadgeFunctions")

const routine_service_url=process.env.ROUTINE_SERVICE

//@desc creates new routine
//@route user/routine
//@access public
const createRoutine = asyncHandler(async (req, res) => {
  const { goal, type, task, userId } = req.body;
  const user = await User.findOne({ _id: userId });
  const newExperience=user.experience+20;
  if (!user) {
    return res.status(404).json({ msg: "user not found" });
  }

  if (!goal || !type || !userId) {
    return res.status(400).json({ message: "requrired field must be filled" });
  }

  if (user.isRoutineCreated === false) {
    //create the rotuine
    

    axios
      .post(`${routine_service_url}}/routine`, { goal, type, task, userId })
      .then(async (response) => {
        

        //?adds experience when user create routine
        await User.updateOne(
          { _id: userId },
          { $set: { isRoutineCreated: true, experience:newExperience} }
        );
        addExpBadge(userId)
        firstRoutineBadge(userId)
        return res.status(200).json({ message: "routine created" });
      })
      .catch(() => {
        return res.status(400).json({ message: "failed to create routine" });
      });
  } else {
    return res.status(401).json({ msg: "already rotuine exists" });
  }
});


//@desc update existing routine
//@route user/routine/userid
//@access public
const updateRoutine = asyncHandler(async (req, res) => {
  const {goal,type}=req.body;
  const userId=req.params.id;

  if (!goal || !type || !userId) {
    return res.status(400).json({ message: "requrired field must be filled" });
  }

  axios.put(`${routine_service_url}/routine/`+userId,{goal,type}).then((response)=>{
    
    if(response.status==200){
      return res.status(200).json({msg:"routine updated"})
    }else{
      return res.status(400).json({msg:"couldn't update"})
    }
  }).catch((err)=>{
    return res.status(400).json({msg:"couldn't update"})
  });
  
});

//@desc delete the routine
//@route user/routine/userid
//@access public
const deleteRoutine = asyncHandler(async (req, res) => {
  const userId=req.params.id

  axios.delete(`${routine_service_url}/routine/`+userId).then(async (response)=>{
    
    const currentUser=await User.findOne({_id:req.params.id});
    const newExperience=currentUser.experience+10;
    await User.updateOne(
      { _id: userId },
      { $set: { isRoutineCreated: false,experience:newExperience } }
    );
  if(response.status==200){
    return res.status(200).json({msg:"routine deleted"})
  }else{
    return res.status(400).json({msg:"couldn't delete"})
  }
}).catch((err)=>{
  return res.status(400).json({msg:"couldn't delete"})
});

});

//@desc get existing routine based on userId
//@route user/routine/:usreId
//@access public
const getRoutine = asyncHandler(async (req, res) => {
  const userId=req.params.id

  axios.get(`${routine_service_url}/routine/`+userId).then((response)=>{
    
  if(response.status==200){
    return res.status(200).json(response.data)
  }else{
    return res.status(400).json({msg:"couldn't get the data"})
  }
  
}).catch((err)=>{
  return res.status(400).json({msg:"couldn't delete"})
});
});

module.exports = { createRoutine,
  updateRoutine,
  deleteRoutine,
getRoutine };
