const express= require('express');
const router=express.Router();

const {getBadgesByUserId}=require("../controller/badgeController")
const tokenValidator=require("../middleware/tokenValidator")

router.get("/:id",tokenValidator,getBadgesByUserId)

module.exports=router;