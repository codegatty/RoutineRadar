const express=require("express");
const routes=express.Router();

const {createRoadmap,deleteRoadmap,getRoadMapByUserId,updateRoadmap}= require("../controller/roadMapController");




routes.get("/:userId",getRoadMapByUserId)

routes.post("/",createRoadmap)

routes.put("/:id",updateRoadmap)

routes.delete("/:id",deleteRoadmap)

module.exports=routes;