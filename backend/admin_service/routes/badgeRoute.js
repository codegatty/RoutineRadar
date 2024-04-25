const express=require("express");
const route=express.Router();
const axios=require("axios");

const {createBadge,deleteBadge,getBadgeByBadgeNo,getBadges,updateBadge}=require("../controller/badgeController");

route.get("/",getBadges);
route.get("/:badgeNo",getBadgeByBadgeNo);
route.post("/",createBadge);
route.put("/:id",updateBadge);
route.delete("/:id",deleteBadge);

module.exports=route