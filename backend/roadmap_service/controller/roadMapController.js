const RoadMap=require("../model/roadMapModel")
const asyncHandler = require("express-async-handler");


const getRoadMapByuserId = asyncHandler(async (req, res) => {
  const userId = req.params.userId;
 

  
  const result = await RoadMap.find({userId:userId})

  if(!result) {
    return res.json({message:"does not exist"});
  }

  return res.json(result);
});

const createRoadmap = asyncHandler(async (req, res) => {
  const { title, description, map,userId } = req.body;

  if (!title || !description || !map || !userId) {
    return res.status(400).json({ message: "please fill all fields" });
  }

  const roadMap = await RoadMap.findOne({title:title});

  if (roadMap) {
    return res.status(400).json({ message: "badge already exists" });
  }

  
  const result = await RoadMap.create({
    title,
    description,
    map,
    userId
  })

  if(!result){
    return res.status(400).json({ message: "something went wrong" });
  }
  return res.send(result);
});

const updateRoadmap = asyncHandler(async (req, res) => {
  const id = req.params.userId;

  const { title, description, map} = req.body;

  if (!title || !description || !map) {
    return res.status(400).json({ message: "please fill all fields" });
  }
  
  const roadMap = await db.findOne({_id:id});

  if (roadMap) {
    return res.status(400).json({ message: "badge does not exist" });
  }

  const result = await RoadMap.findByIdAndUpdate(id,{title,description,map},{new:true});
  
  if(!result){
    return res.status(400).json({ message: "something went wrong" });
  }
  return res.json(result);
});

const deleteRoadmap = asyncHandler(async (req, res) => {
    const id=req.params.id;

    
    const roadMap = await RoadMap.findById(id);
  
    if (!roadMap) {
      return res.status(400).json({ message: "badge does not exist" });
    }


    const result=await RoadMap.deleteOne({ _id:id});

    return res.json(result);
});


module.exports = {createRoadmap,deleteRoadmap,updateRoadmap,getRoadMapByuserId}

