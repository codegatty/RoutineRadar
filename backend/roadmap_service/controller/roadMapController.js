const RoadMap=require("../model/roadMapModel")
const asyncHandler = require("express-async-handler");


const getRoadMapByUserId = asyncHandler(async (req, res) => {
  const userId = req.params.userId;
 
  const result = await RoadMap.find({userId:userId})

  if(!result) {
    return res.json({message:"does not exist"});
  }

  return res.json(result);
});

const createRoadmap = asyncHandler(async (req, res) => {
  const { title, description, paths,userId } = req.body;

  if (!title || !description|| !userId) {
    return res.status(400).json({ message: "please fill all fields" });
  }

  // const roadMap = await RoadMap.findOne({title:title});

  // if (roadMap) {
  //   return res.status(400).json({ message: "already there" });
  // }

  
  const result = await RoadMap.create({
    title,
    description,
    paths,
    userId
  })

  if(!result){
    return res.status(400).json({ message: "something went wrong" });
  }
  return res.send(result);
});

const updateRoadmap = asyncHandler(async (req, res) => {
  const id = req.params.id;

  const { title, description, map} = req.body;

  if (!title || !description || !map) {
    return res.status(400).json({ message: "please fill all fields" });
  }
  
  const roadMap = await RoadMap.findOne({_id:id});

  if (!roadMap) {
    return res.status(400).json({ message: "roadMap does not exist" });
  }

  const result = await RoadMap.findByIdAndUpdate(id,{title,description,map},{new:true});
  
  if(!result){
    return res.status(400).json({ message: "something went wrong" });
  }
  return res.json(result);
});


const addPaths=asyncHandler(async(req,res)=>{
  const id=req.params.id
  const {path}=req.body;
  const result = await RoadMap.findByIdAndUpdate(
    id,
    { $push: { paths: path } }, // Assuming 'paths' is the field name in the schema
    { new: true }
  );
  res.status(200).json(result);
})

const updateIsCompleted=asyncHandler(async (req,res)=>{
  const roadMap_id=req.params.id;
  const {pathId,isCompleted}=req.body


  const result = await RoadMap.findOneAndUpdate(
    { _id: roadMap_id, "paths._id": pathId },
    { $set: { "paths.$.isCompleted": isCompleted } },
    { new: true }
  );
  res.status(200).json(result);

})

const deleteRoadmap = asyncHandler(async (req, res) => {
    const id=req.params.id;

    
    const roadMap = await RoadMap.findById(id);
  
    if (!roadMap) {
      return res.status(400).json({ message: "badge does not exist" });
    }


    const result=await RoadMap.deleteOne({ _id:id});

    return res.json(result);
});


module.exports = {createRoadmap,deleteRoadmap,updateRoadmap,getRoadMapByUserId,addPaths,updateIsCompleted}

