const express= require('express');
const router=express.Router();

const {getBadgesByUserId}=require("../controller/badgeController")

router.get("/:id",getBadgesByUserId)

module.exports=router;