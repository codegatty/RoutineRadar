const express=require("express");
const route=express.Router();
const axios=require("axios");

const {createBadge,deleteBadge,getBadgeByBadgeNo,getBadges,updateBadge}=require("../controller/badgeController");

//user-defined middleware
const tokenValidator = require('../middleware/tokenValidator');

route.get("/",tokenValidator,getBadges);
route.get("/:badgeNo",tokenValidator,getBadgeByBadgeNo);
route.post("/",tokenValidator,createBadge);
route.put("/:id",tokenValidator,updateBadge);
route.delete("/:id",tokenValidator,deleteBadge);

module.exports=route