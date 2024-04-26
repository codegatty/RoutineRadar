const express=require("express");
const routes=express.Router();

const {createRoadmap,deleteRoadmap,getRoadMapByuserId,updateRoadmap}= require("../controller/roadMapController");




routes.get("/:userId",getRoadMapByuserId)

routes.post("/",createRoadmap)

routes.put("/:id",updateRoadmap)

routes.delete("/:id",deleteRoadmap)

module.exports=routes;