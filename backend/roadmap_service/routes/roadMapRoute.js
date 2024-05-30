const express=require("express");
const routes=express.Router();

const {createRoadmap,deleteRoadmap,getRoadMapByUserId,updateRoadmap,addPaths,updateIsCompleted}= require("../controller/roadMapController");

routes.get("/:userId",getRoadMapByUserId)

routes.post("/",createRoadmap)

routes.put("/:id",updateRoadmap)

routes.put("/add_path/:id",addPaths)

routes.put("/update_isCompleted/:id",updateIsCompleted)

routes.delete("/:id",deleteRoadmap)

module.exports=routes;