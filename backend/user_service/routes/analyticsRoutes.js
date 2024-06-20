const express= require('express');
const router=express.Router();

const {fetchAnalytics,updatedAnalytics}=require("../controller/analyticsController")

router.get("/:id",fetchAnalytics)
router.put("/:id",updatedAnalytics)

module.exports=router;