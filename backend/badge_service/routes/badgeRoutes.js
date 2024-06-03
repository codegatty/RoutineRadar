const express=require("express");
const routes=express.Router();

const {getAllBadges,getBadgeByBadgeNo,updateBadge,createBadge,deleteBadge,getBadgeByBadgeNos}= require("../controller/badgeController");


routes.get("/",getAllBadges)
routes.post("/",createBadge)

routes.get("/fetchBadges",getBadgeByBadgeNos)

routes.get("/:badgeNo",getBadgeByBadgeNo)
routes.put("/:id",updateBadge)

routes.delete("/:id",deleteBadge)



module.exports=routes;