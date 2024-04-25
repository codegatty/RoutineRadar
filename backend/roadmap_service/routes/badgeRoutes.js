const express=require("express");
const routes=express.Router();

const {getAllBadges,getBadgeByBadgeNo,updateBadge,createBadge,deleteBadge}= require("../controller/badgeController");


routes.get("/",getAllBadges)

routes.get("/:badgeNo",getBadgeByBadgeNo)

routes.post("/",createBadge)

routes.put("/:id",updateBadge)

routes.delete("/:id",deleteBadge)

module.exports=routes;