const asyncHandler = require("express-async-handler");
const axios = require("axios");

const User = require("../model/userModel");

//@desc creates new routine
//@route user/routine
//@access public
const createRoutine = asyncHandler(async (req, res) => {
  const { goal, type, task, userId } = req.body;
  const user = await User.findOne({ _id: userId });

  if (!user) {
    return res.status(404).json({ msg: "user not found" });
  }

  if (!goal || !type || !userId) {
    return res.status(400).json({ message: "requrired field must be filled" });
  }

  if (user.isRoutineCreated === false) {
    //create the rotuine

    axios
      .post("http://localhost:5005/routine", { goal, type, task, userId })
      .then(async (response) => {
        await User.updateOne(
          { _id: userId },
          { $set: { isRoutineCreated: true } }
        );
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
//@route user/routine/
//@access public
const updateRoutine = asyncHandler(async (req, res) => {
  const {goal,type}=req.body;
  const userId=req.params.id;

  if (!goal || !type || !userId) {
    return res.status(400).json({ message: "requrired field must be filled" });
  }
  const user=await User.findOne({_id:userId});
  if(!user ) {
    return res.status(404).json({msg:"user does not exist"})
  }else if(user.isRoutineCreated===false){
    return res.status(404).json({msg:"user doesn not have current routine"})
  }

  axios.put("http://localhost:5005/routine/"+userId,{goal,type}).then((response)=>{
    
    if(response.status==200){
      return res.status(200).json({msg:"routine updated"})
    }else{
      return res.status(400).json({msg:"couldn't update"})
    }
  }).catch((err)=>{
    return res.status(400).json({msg:"couldn't update"})
  });
  
});


const deleteRoutine = asyncHandler(async (req, res) => {
  const userId=req.params.id

  const user=await User.findOne({_id:userId});
  if(!user ) {
    return res.status(404).json({msg:"user does not exist"})
  }else if(user.isRoutineCreated===false){
    return res.status(404).json({msg:"user doesn not have current routine"})
  }

  axios.delete("http://localhost:5005/routine/"+userId).then((response)=>{
    
  if(response.status==200){
    return res.status(200).json({msg:"routine deleted"})
  }else{
    return res.status(400).json({msg:"couldn't delete"})
  }
}).catch((err)=>{
  return res.status(400).json({msg:"couldn't delete"})
});

});

const getRoutine = asyncHandler(async (req, res) => {
  const userId=req.params.id

  const user=await User.findOne({_id:userId});
  console.log(user);
  if(!user ) {
    return res.status(404).json({msg:"user does not exist"})
  }else if(user.isRoutineCreated===false){
    return res.status(404).json({msg:"user doesn not have current routine"})
  }


  axios.get("http://localhost:5005/routine/"+userId).then((response)=>{
    
  if(response.status==200){
    return res.status(200).json(response.data)
  }else{
    return res.status(400).json({msg:"couldn't delete"})
  }
}).catch((err)=>{
  return res.status(400).json({msg:"couldn't delete"})
});
});

module.exports = { createRoutine,
  updateRoutine,
  deleteRoutine,
getRoutine };
